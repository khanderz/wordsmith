// require("module-alias/register");

// const { Surgery, Provider } = require("@serverless/models/mongodb");
// const DbConnector = require("@serverless/libs/DbConnector");
// const GraphqlResolver = require("@serverless/libs/GraphqlResolver");
// const { Auth0Client, getAuth0Config } = require("@serverless/libs/Auth0Client");
// const SendService = require("@serverless/libs/SendService");
// const { ObjectId } = require("mongodb");

// const resolvers = {
//   Query: {
//     getUserByEmail: GraphqlResolver.getQuery(
//       async (args, fields, ctx, evt) => {
//         const { email, bidCompanyId, procedureId, accessLevel } = args;
//         const { orgId } = evt?.resolverContext;

//         let authClient;
//         try {
//           authClient = new Auth0Client(getAuth0Config());
//           await authClient.init();
//         } catch (e) {
//           console.error(e);
//           throw new Error("Failed to init Auth0Client");
//         }

//         if (!email) {
//           throw new Error("User email address is required");
//         }

//         return await authClient.getUserByEmail(email);
//       },
//       [DbConnector.MONGO]
//     ),
//     searchRepUsers: GraphqlResolver.getQuery(
//       async (args, fields, ctx, evt) => {
//         const { name, bidCompanyId } = args;
//         const { orgId } = evt?.resolverContext;

//         let authClient;
//         try {
//           authClient = new Auth0Client(getAuth0Config());
//           await authClient.init();
//         } catch (e) {
//           console.error(e);
//           throw new Error("Failed to init Auth0Client");
//         }

//         const users = await authClient.searchRepUsers(name, bidCompanyId);
//         return users
//           .filter(
//             (user) =>
//               Boolean(user.app_metadata?.bidCompanyId) &&
//               Boolean(user.app_metadata?.first_name) &&
//               Boolean(user.app_metadata?.last_name)
//           )
//           .map((user) => {
//             return {
//               id: user.user_id,
//               email: user.email,
//               emailVerified: user.email_verified,
//               firstName: user.app_metadata.first_name,
//               lastName: user.app_metadata.last_name,
//               bidCompanyId: user.app_metadata.bidCompanyId,
//             };
//           });
//       },
//       [DbConnector.MONGO]
//     ),
//     searchRepCompanies: GraphqlResolver.getQuery(
//       async (args, fields, ctx, evt) => {
//         const { bidCompanyIds } = args;

//         let authClient;
//         try {
//           authClient = new Auth0Client(getAuth0Config());
//           await authClient.init();
//         } catch (e) {
//           console.error(e);
//           throw new Error("Failed to init Auth0Client");
//         }

//         const users = await authClient.searchRepCompanies(bidCompanyIds);
//         return users
//           .filter(
//             (user) =>
//               Boolean(user.app_metadata?.bidCompanyId) &&
//               Boolean(user.app_metadata?.first_name) &&
//               Boolean(user.app_metadata?.last_name)
//           )
//           .map((user) => {
//             return {
//               id: user.user_id,
//               email: user.email,
//               emailVerified: user.email_verified,
//               firstName: user.app_metadata.first_name,
//               lastName: user.app_metadata.last_name,
//               bidCompanyId: user.app_metadata.bidCompanyId,
//             };
//           });
//       },
//       [DbConnector.MONGO]
//     ),
//   },
//   Mutation: {
//     sendProductRepInvite: GraphqlResolver.getMutation(
//       async (args, fields, ctx, evt) => {
//         const { email, bidCompanyId, procedureId, accessLevel } = args;
//         const { orgId } = evt?.resolverContext;

//         let authClient;
//         try {
//           authClient = new Auth0Client(getAuth0Config());
//           await authClient.init();
//         } catch (e) {
//           console.error(e);
//           throw new Error("Failed to init Auth0Client");
//         }

//         if (!email) {
//           throw new Error("User email address is required");
//         }

//         try {
//           let existingUser = await authClient.getUserByEmail(email);

//           auth0user = await authClient.createInvitedRepUser({
//             existingUser,
//             email,
//             bidCompanyId,
//             orgId,
//             inviteCode: procedureId
//               ? `${accessLevel}${procedureId}`
//               : undefined,
//           });

//           let success = false;
//           if (!existingUser) {
//             success = await authClient.sendPasswordChangeEmail({ email });
//           } else {
//             success = true;
//           }

//           return {
//             success,
//           };
//         } catch (e) {
//           throw new Error(e.message);
//         }
//       },
//       [DbConnector.MONGO]
//     ),
//     resetUserPassword: GraphqlResolver.getMutation(
//       async (args, fields, ctx, evt) => {
//         const email = args.email;
//         if (!email) {
//           throw new Error("User email address is required");
//         }

//         let authClient;
//         try {
//           authClient = new Auth0Client(getAuth0Config());
//           await authClient.init();
//         } catch (e) {
//           console.error(e);
//           throw new Error("Failed to init Auth0Client");
//         }

//         try {
//           const success = await authClient.sendPasswordChangeEmail({ email });

//           return {
//             success,
//           };
//         } catch (e) {
//           throw new Error(e.message);
//         }
//       },
//       [DbConnector.MONGO]
//     ),
//      // FIXME: NEED TO FETCH ORG FOR EMAIL TEMPLATE
//      sendProcedureToRep: GraphqlResolver.getMutation(
//       async (args, fields, ctx, evt) => {
//         const { orgId } = evt.resolverContext;
//         const { surgeryId, repEmail, repCell, repFirstName, repLastName, repCompanyName, type } = args;
//         const sendService = new SendService();

//         if (!ObjectId.isValid(surgeryId)) {
//           throw new Error("Invalid Surgery ID provided.");
//         }

//         const surgery = await Surgery.findOne({ _id: surgeryId })
//         .populate(['visit', 'procedures'])
//         .lean();

//         if (!surgery) {
//           throw new Error(`No Surgery found with id: ${surgeryId}`);
//         }

//         const provider = await Provider.findOne({
//           _id: surgery.visit.attendingProvider,
//         }).lean();

//         const procedure = surgery.procedures[0];

//         const sendOpts = {
//           data: {
//             identifier: procedure.name.slice(procedure.name.length - 4),
//             procedureId: procedure._id,
//             // FIXME: Replace with orgName
//             hospitalName: orgId,
//             surgeonName: `${provider.firstName} ${provider.lastName}`,
//             repName: `${repFirstName ? repFirstName : ""} ${repLastName ? repLastName : ""}`,
//             repCompanyName: `${repCompanyName ? repCompanyName : ""}`,
//           },
//         };

//         if (type === "EMAIL") {
//           if (!repEmail) {
//             throw new Error(`Email address required to send email`);
//           }
//           sendOpts.email = repEmail;
//         } else if (type === "SMS") {
//           if (!repCell) {
//             throw new Error(`Cell phone number required to send SMS`);
//           }
//           sendOpts.phoneNumber = repCell;
//         }

//         const sendResult = await sendService.sendRecordToRep(sendOpts);

//         return { success: sendResult };
//       },
//       [DbConnector.MONGO]
//     ),

//   },
//   Subscription: {},
// };

// module.exports = resolvers;
