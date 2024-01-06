const {
    word,
    user,
  } = require("./resolvers/");
//   const {
//     awsDateScalar,
//     awsTimeScalar,
//     awsDateTimeScalar,
//     awsJSONScalar,
//   } = require("./resolvers/scalars");
  
  const resolvers = {
    Query: {
      ...word.Query,
      ...user.Query,
    },
    Mutation: {
      ...word.Mutation,
      ...user.Mutation,
    },
//     AWSDate: awsDateScalar,
//     AWSTime: awsTimeScalar,
//     AWSDateTime: awsDateTimeScalar,
//     AWSJSON: awsJSONScalar,
  };
  
  module.exports = resolvers;
  