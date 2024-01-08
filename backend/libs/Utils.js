const postgres = require("postgres")

class Utils {

  static getConfig() {
    return {
      supabase: {
        username: process.env.SUPABASE_USERNAME,
        password: process.env.SUPABASE_PASSWORD,
        hostname: process.env.SUPABASE_HOST_NAME,
        port: isNaN(Number(process.env.SUPABASE_PORT))
          ? 5432
          : Number(process.env.SUPABASE_PORT),
        db: process.env.SUPABASE_DB_NAME,
//         ssl: process.env.MONGO_SSL === "true",
//         "hostname-srv": process.env.MONGO_HOST_NAME_SRV === "true",
      },
      graphql: {
        schema: process.env.GRAPHQL_SCHEMA_PATH,
      },
//       aws: {
//         region: process.env.AWS_REGION,
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//         sessionToken: process.env.AWS_SESSION_TOKEN,
//       },
//       auth0: {
//         domain: process.env.AUTH0_DOMAIN,
//         clientId: process.env.AUTH0_CLIENT_ID,
//         clientSecret: process.env.AUTH0_CLIENT_SECRET,
//         audience: process.env.AUTH0_AUDIENCE,
//         namespace: process.env.AUTH0_NAMESPACE,
//         jwtCert: process.env.AUTH0_JWT_CERT,
//       },
    };
  }

//   static getParams() {
//     const config = Utils.getConfig();

//     return {
//     //   ...config.AWS,
//       ...process.env,
//     };
//   }

  static async awaitSupabaseConnectionUsingConfig(configOverride) {
    if (this.isServerless()) {
      const config = configOverride ?? this.getConfig();

      await this.#awaitSupabaseConnection(
        config.supabase.username,
        config.supabase.password,
        config.supabase.hostname,
        config.supabase.port,
        config.supabase.db,
        // config.supabase.ssl,
        // config.supabase["hostname-srv"]
      );
    } else {
      const config = configOverride ?? this.getConfig();

      await this.#awaitSupabaseConnection(
        config.supabase.username,
        config.supabase.password,
        config.supabase.hostname,
        config.supabase.port,
        config.supabase.db,
        // config.supabase.ssl,
        // config.supabase["hostname-srv"]
      );
    }
  }

  static async #awaitSupabaseConnection(
    user,
    password,
    hostname,
    port,
    db_name,
    // ssl = true,
    // isSrv = false,
    timeoutMs = 1000
  ) {
    // const mongoose = require("mongoose");
    

    console.log("Connecting to Document DB...");

    const supabaseUri = `postgresql://${user}:${password}@${hostname}:${port}/${db_name}`;
    const client = postgres(supabaseUri, { prepare: false })

    const waitForDbConnection = async () => {
      return new Promise((resolve, reject) => {
        const waitForDb = async () => {
            client.Promise = global.Promise;

          try {
            await client.connect(supabaseUri, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            //   ssl,
            });

            return resolve();
          } catch (e) {
            console.log("Waiting for DocumentDB...");

            setTimeout(waitForDb, timeoutMs);
          }
        };

        waitForDb();
      });
    };

    await waitForDbConnection();

    console.log("Connected to DocumentDB");
  }

  static removeNulls(obj) {
    if (typeof obj !== "object") {
      return obj;
    }

    const newObj = {};

    Object.keys(obj).forEach((key) => {
      if (obj[key] !== null) {
        newObj[key] = obj[key];
      }
    });

    return newObj;
  }

  static dropEmptyStrings(obj) {
    if (typeof obj !== "object") {
      return obj;
    }

    const newObj = {};

    Object.keys(obj).forEach((key) => {
      if (obj[key] !== "") {
        newObj[key] = obj[key];
      }
    });

    return newObj;
  }
}

module.exports = Utils;
