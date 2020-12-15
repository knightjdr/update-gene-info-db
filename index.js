/* eslint no-console: 0 */

const path = require('path');
const rimraf = require('rimraf');

const database = require('./database');
const unzip = require('./unzip');
const updateCollection = require('./update-collection');

const species = [
  'Arabidopsis thaliana',
  'Caenorhabditis elegans',
  'Danio rerio',
  'Dictyostelium discoideum',
  'Drosophila melanogaster',
  'Escherichia coli (K12)',
  'Gallus gallus',
  'Homo sapiens',
  'Mus musculus',
  'Saccharomyces cerevisiae',
  'Salmonella Typhimurium (LT2)',
  'Schizosaccharomyces pombe',
  'Xenopus laevis',
];

const unzippedDir = path.resolve(process.cwd(), './databases');
const zipFile = path.resolve(process.cwd(), './databases.zip');

const iterateSpecies = async () => {
  await species.reduce(async (accum, specie) => {
    await accum;
    console.log('\x1b[33m%s\x1b[0m', `Updating ${specie}`);
    return updateCollection(specie);
  }, Promise.resolve());
};

const main = async () => {
  try {
    await unzip(zipFile);
    await database.init();
    await iterateSpecies();
    database.close();
    rimraf(zipFile, () => {});
    rimraf(unzippedDir, () => {});
  } catch(err) {
    console.log('\x1b[31m%s\x1b[0m', `Failed to update. ${err.toString()}`);
  }
};

main();
