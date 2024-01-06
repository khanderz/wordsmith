// class DbConnector {
//     static MONGO = new DbConnector("mongodb");
  
//     #name = null;
//     #dbConnector = null;
//     #dbConnectors = {
//       mongodb: async (ctx, params) => {
//         const mongoose = require("mongoose");
  
//         if (mongoose.connection.readyState === 0) {
//           const Utils = require("@serverless/libs/Utils");
  
//           return Utils.awaitMongooseConnectionUsingConfig();
//         }
//       },
//     };
  
//     constructor(name) {
//       this.#name = name;
//       this.#dbConnector = this.#dbConnectors[this.#name];
//     }
  
//     connect(ctx, params) {
//       return this.#dbConnector(ctx, params);
//     }
  
//     toString() {
//       return this.#name;
//     }
//   }
  
//   module.exports = DbConnector;
  