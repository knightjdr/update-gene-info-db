const { MongoClient } = require('mongodb');

const mongoSetup = require('./mongo-setup');

const mockClient = {
  db: dbInstance => (
    dbInstance
  ),
};
jest.mock('mongodb');
MongoClient.connect.mockImplementation(() => Promise.resolve(mockClient));

describe('database initialization', () => {
  it('should succeed', async () => {
    const data = await mongoSetup.initialize();
    expect(data).toEqual({
      client: mockClient,
      db: 'geneinfo',
    });
  });
});
