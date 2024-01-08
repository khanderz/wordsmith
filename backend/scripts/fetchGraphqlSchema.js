require("dotenv").config();

const fs = require("fs");
const gradient = require("gradient-string");
const path = require("path");
const ProgressBar = require("progress");
const { fetch } = require("cross-undici-fetch");
const  Utils  = require('../libs/Utils')

const configs = Utils.getConfig()

const username = configs.supabase.username
const pass = configs.supabase.password
const hostname = configs.supabase.hostname
const port = configs.supabase.port
const db = configs.supabase.db
const schema = configs.graphql.schema

const supabaseUri = `postgresql://${username}:${pass}@${hostname}:${port}/${db}`;


const {
  buildClientSchema,
  getIntrospectionQuery,
  printSchema,
} = require("graphql");

const supagradient = gradient(["#00CB8A", "#78E0B8"]);

function fetchGraphQLSchema(url, options) {
  options = options || {}; // eslint-disable-line no-param-reassign

  const bar = new ProgressBar("🔦  Introspecting schema [:bar]", 24);

  const id = setInterval(function () {
    bar.tick();
    if (bar.complete) {
      clearInterval(id);
    }
  }, 250);

  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      apiKey: pass,
    },
    body: JSON.stringify({
      query: getIntrospectionQuery(),
    }),
  })
    .then((res) => res.json())
    .then((schema) => {
      if (options.readable) {
        return printSchema(buildClientSchema(schema));
      }

      bar.complete();
      return JSON.stringify(schema, null, 2);
    });
}

const filePath = path.join(__dirname, "../graphql/schema/", "schema.graphql");

console.log(
  supagradient(
    `🗞   Fetching GraphQL Schema from ${supabaseUri} ...`
  )
);

fetchGraphQLSchema(`${supabaseUri}/graphql/v1`, {
  readable: true,
}).then((schema) => {
  fs.writeFileSync(filePath, schema, "utf-8");
  console.log(supagradient(`✨  Saved to ${filePath}`));
  console.log(
    '💡  Be sure to run "yarn run codegen" to generate latest types.'
  );
});