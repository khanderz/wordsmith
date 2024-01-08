const {
    word,
    user,
  } = require("./resolvers");

  const resolvers = {
    Query: {
      ...word?.Query,
      ...user?.Query,
    },
    Mutation: {
      ...word?.Mutation,
      ...user?.Mutation,
    },
  };
  
  module.exports = resolvers;
  