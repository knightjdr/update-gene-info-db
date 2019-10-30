const mongoSetup = require('./mongo-setup');

const database = {
  client: null,
  close: async () => {
    if (database.connection) {
      await database.client.close();
      database.client = null;
      database.connection = null;
    }
  },
  connection: null,
  init: async () => {
    const initializationObject = await mongoSetup.initialize();
    database.client = initializationObject.client;
    database.connection = initializationObject.db;
  },
};

module.exports = database;
