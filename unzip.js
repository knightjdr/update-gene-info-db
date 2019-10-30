const extract = require('extract-zip');

const unzipFile = (file) => (
  new Promise((resolve, reject) => {
    extract(file, { dir: process.cwd() }, (err) => {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  })
);

module.exports = unzipFile;
