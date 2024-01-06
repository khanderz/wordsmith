require("dotenv").config();
require("module-alias/register");

const { createServer } = require("http");
const express = require("express");

(async () => {
    const bodyParser = require("body-parser");
    const errorHandler = require("express-json-errors");
  
    const Apollo = require("./libs/Apollo");
    const { typeDefs, resolvers } = require("./routes/graphql/index");
  
    const PORT = process.env.PORT;
    const app = express();
  
    app.use(errorHandler());
    app.use(bodyParser.json({ limit: "10mb" }));
    app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
  
    const Utils = require("./libs/Utils");
    if (!Utils.isServerless()) {
    //   const mongoose = require("mongoose");
        const supabase = require("./libs/DbConnector").SUPABASE;
  
      if (supabase === null) {
        await Utils.awaitSupabaseConnectionUsingConfig();
      }
    }
  
    // app.use("/", require("./routes/index"));
  
    const httpServer = createServer(app);
  
    await Apollo.createApolloServer(
      typeDefs,
      resolvers,
      app,
      httpServer,
      "/graphql"
  );
  
    httpServer.listen(PORT);

    httpServer.on("listening", () => {
      console.info(
        `🚀 REST endpoints @ http://localhost:${
          process.env.PORT ?? app.get("port")
        }`
      );
      console.info(
        `🚀 Serverless endpoints @ http://localhost:${
          process.env.PORT ?? app.get("port")
        }/serverless`
      );
    });

    httpServer.on("error", (error) => {
      if (error.syscall !== "listen") {
        throw error;
      }
  
      const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  
      // handle specific listen errors with friendly messages
      switch (error.code) {
        case "EACCES":
          console.error(bind + " requires elevated privileges");
          process.exit(1);
  
          break;
        case "EADDRINUSE":
          console.error(bind + " is already in use");
          process.exit(1);
  
          break;
        default:
          throw error;
      }
    });
  })();
  