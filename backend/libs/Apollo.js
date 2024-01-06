const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

const { makeExecutableSchema } = require("@graphql-tools/schema");
// const { execute, subscribe } = require("graphql");
// const { SubscriptionServer } = require("subscriptions-transport-ws");

class Apollo {
    static contextHandler({ req, res }) {
//       const pemString = `-----BEGIN CERTIFICATE-----
//   MIIDETCCAfmgAwIBAgIJX9hzkR/VgDvSMA0GCSqGSIb3DQEBCwUAMCYxJDAiBgNV
//   BAMTG21lZGdlby1zdGFnaW5nLnVzLmF1dGgwLmNvbTAeFw0yMzAyMjEyMDQ1NTda
//   Fw0zNjEwMzAyMDQ1NTdaMCYxJDAiBgNVBAMTG21lZGdlby1zdGFnaW5nLnVzLmF1
//   dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMShSOyPQibf
//   OzguBcahAzsra5CfzR8csO5UnjOor+f06RRigmpOm/9LD1Xf9EXtFkxmfz1BdzwS
//   CFyxCl0lOXvGfYKCJa7vDl+2ES8ygXxaMynLuXli2hQRJj552RdtrelGByGMVNx9
//   Me0cvRcfEcxBBo/jyfVavlS7IdQj10In03Wcj2Ss00jKRAMMkFSBmf6CjwIkAXi7
//   cRziNa4rkUITPkucVK6LTBduPGnYO6UfWJlAGGM2qY1qHHl8bCNHp/mAZhkGff1C
//   N47bct1sH2WJr7fptu1qYMtSPIbuXZhN070RGJlja0pd4KMhUDtP9JjW/iQjnBxB
//   pz6NRQlID8MCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUBjng
//   h+vb/lYU4OAATKySm+92JOkwDgYDVR0PAQH/BAQDAgKEMA0GCSqGSIb3DQEBCwUA
//   A4IBAQBrZeEV6FBTSFrbHfS9hSgGl5j2ioEvZvc5bG74hciMACpsiKQ6EZAmBOkt
//   npMPLSFvfKZC028xS+5hzBgaKjI9UpMjTbBlpWznz3P4Wh1yThuwjne/2QMp8e8S
//   tnTvAmPO9sw3aIy+FUBNhYcjHsHOxWur8y5Jnc6tHx+TBu1lqyxjvqs5S0kbj3eZ
//   bY8PBmnch2iPkTL3e2I0DZ3W8zBhTWA80gso08uHkYKuh0T8M8o4q2O9nIG1o2Kh
//   cf5rzIOTGQXwOGz6mrNto91v6v1CPhn4KCYE64oVVGeZjrySUIgU3Z7n7wd/2ZK4
//   OjDfZXVUb/pFd2yCQ+NeDmkoWQcw
//   -----END CERTIFICATE-----`;

      const token = req.headers.authorization;
      return {
        user: token ? jwt.verify(token
            // , pemString
            ) : undefined,
      };
    }

  static async createApolloServer(typeDefs = [], resolvers, app, httpServer, path) {
      const schema = makeExecutableSchema({ typeDefs, resolvers });
  
    //   const subscriptionServer = null;
  
    //   if (resolvers.Subscription !== undefined) {
    //     SubscriptionServer.create(
    //       { schema, execute, subscribe },
    //       { server: httpServer, path }
    //     );
  
    //     console.info(
    //       `🚀 Subscription endpoints @ ws://localhost:${
    //         process.env.NODE__PORT_CONTAINER ?? app.get("port")
    //       }${path}`
    //     );
    //   }
  
      const server = new ApolloServer({
        schema,
        context: Apollo.contextHandler,
        // plugins: [
        //   ...(subscriptionServer !== null
        //     ? [
        //         {
        //           async serverWillStart() {
        //             return {
        //               async drainServer() {
        //                 subscriptionServer.close();
        //               },
        //             };
        //           },
        //         },
        //       ]
        //     : []),
        // ],
      });
  
      await server.start();
  
      server.applyMiddleware({ app, path });
  
      console.info(
        `🚀 Query/Mutation endpoints @ http://localhost:${
          process.env.NODE__PORT_CONTAINER ?? app.get("port")
        }${server.graphqlPath}`
      );
  
      return server;
    }
  }
  
  module.exports = Apollo;