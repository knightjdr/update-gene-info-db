const { MongoClient } = require('mongodb');

const config = require('./config');

const { db, pw, user} = config;
const url = `mongodb://${user}:${pw}@localhost:27017/${db}`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const initialize = async () => {
  const client = await MongoClient.connect(url, options);
  return {
    client,
    db: client.db(db),
  };
};

module.exports = {
  initialize,
  options,
  url,
};
