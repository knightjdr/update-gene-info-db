
const path = require('path');

const database = require('./database');
const insertCollection = require('./insert-collection');


const updateCollection = async (species) => {
  const db = database.connection;
  const file = path.resolve(process.cwd(), `./databases/${species}.json`);
  await db.collection(species).deleteMany({});
  await insertCollection(file, species);
};

module.exports = updateCollection;
