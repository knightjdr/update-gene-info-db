const fs = require('fs');
const JSONStream = require('JSONStream');
const streamToMongoDB = require('./stream-to-mongo');

const database = require('./database');
const mongoSetup = require('./mongo-setup');

const insertCollection = (file, species) => (
  new Promise((resolve, reject) => {
    const outputConfig = {
      collection : species,
      db: database.connection,
      dbURL : mongoSetup.url,
    };

    const writableStream = streamToMongoDB(outputConfig);

    fs.createReadStream(file)
      .pipe(JSONStream.parse('*'))
      .pipe(writableStream)
      .on('close', function(){
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  })
);

module.exports = insertCollection;
