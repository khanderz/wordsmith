const Utils = require("../../libs/Utils");

const typeDefs = Utils.getGraphQLTypeDefsFromDir(
  "./graphql/schemas",
  "user.graphql",
//   "scalars.graphql"
);

const resolvers = require("../../graphql/resolvers");

module.exports = { typeDefs, resolvers };
