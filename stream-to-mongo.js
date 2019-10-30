const _stream = require('stream');

const streamToMongo = (options) => {
  const config = {
    batchSize: 1,
    insertOptions: { w: 1 },
    ...options,
  };

  let collection;
  let records = [];

  const insert = async () => {
    await collection.insertMany(records, config.insertOptions);
    records = [];
  };

  const writable = new _stream.Writable({
    objectMode: true,
    write: async (record, encoding, next) => {
      try {
        if (!collection) {
          collection = await config.db.collection(config.collection);
        }
        records.push(record);
        if (records.length >= config.batchSize) {
          await insert();
        }
        next();
      } catch (error) {
        writable.emit('error', error);
      }
    },
  });

  writable.on('finish', async () => {
    try {
      if (records.length > 0) {
        await insert();
      }
      writable.emit('close');
    } catch (error) {
      writable.emit('error', error);
    }
  });

  return writable;
};

module.exports = streamToMongo;
