class DbConnector {
    static SUPABASE = new DbConnector("supabase");
  
    #name = null;
    #dbConnector = null;
    #dbConnectors = {
      mongodb: async (ctx, params) => {
  
        if (SUPABASE.connection.readyState === 0) {
          const Utils = require("./Utils");
  
          return Utils.awaitSupabaseConnectionUsingConfig();
        }
      },
    };
  
    constructor(name) {
      this.#name = name;
      this.#dbConnector = this.#dbConnectors[this.#name];
    }
  
    connect(ctx, params) {
      return this.#dbConnector(ctx, params);
    }
  
    toString() {
      return this.#name;
    }
  }
  
  module.exports = DbConnector;
  