import type { CodegenConfig } from '@graphql-codegen/cli'
import { addTypenameSelectionDocumentTransform } from '@graphql-codegen/client-preset'
import  Utils  from './libs/Utils'

const configs = Utils.getConfig()

const username = configs.supabase.username
const pass = configs.supabase.password
const hostname = configs.supabase.hostname
const port = configs.supabase.port
const db = configs.supabase.db
const schema = configs.graphql.schema

const supabaseUri = `postgresql://${username}:${pass}@${hostname}:${port}/${db}`;

const config: CodegenConfig = {
//   schema: 'http://localhost:54321/graphql/v1', // Using the local endpoint, update if needed
  schema: "./graphql/schemas/*.graphql",
//   documents: 'src/**/*.tsx',
  emitLegacyCommonJSImports: false,
  overwrite: true,
  ignoreNoDocuments: true,
  generates: {
    'src/gql/': {
      preset: 'client',
      documentTransforms: [addTypenameSelectionDocumentTransform],
      plugins: [],
      config: {
        scalars: {
          UUID: 'string',
          Date: 'string',
          Time: 'string',
          Datetime: 'string',
          JSON: 'string',
          BigInt: 'string',
          BigFloat: 'string',
          Opaque: 'any',
        },
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['npm run prettier'], // optional
  },
}

export default config