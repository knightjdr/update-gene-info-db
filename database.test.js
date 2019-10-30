const database = require('./database');
const mongoSetup = require('./mongo-setup');

const err = new Error('err');
jest.mock('./mongo-setup');

afterEach(() => {
  database.client = null;
  database.connection = null;
});

describe('database connection', () => {
  describe('with successful connection', () => {
    beforeAll(() => {
      mongoSetup.initialize.mockResolvedValue({ client: 'client', db: 'database' });
    });

    it('should resolve', async () => {
      await database.init();
      expect(database.connection).toBe('database');
    });
  });

  describe('on closing', () => {
    describe('when connection exists', () => {
      beforeAll(async () => {
        const client = {
          close: async () => {},
        };
        mongoSetup.initialize.mockResolvedValue({ client, db: 'database' });
        await database.init();
      });

      it('should close successfully', async () => {
        await database.close();
        expect(database.client).toBeNull();
        expect(database.connection).toBeNull();
      });
    });

    describe('when connection does not exist', () => {
      it('should close successfully', async () => {
        await database.close();
        expect(database.client).toBeNull();
        expect(database.connection).toBeNull();
      });
    });
  });
});
