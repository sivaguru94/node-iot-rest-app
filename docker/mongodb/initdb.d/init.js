db.auth(_getEnv('MONGO_INITDB_ROOT_USERNAME'), _getEnv('MONGO_INITDB_ROOT_PASSWORD'));
db = db.getSiblingDB('iot-home-automation');
db.createUser({
  user: _getEnv('MONGO_INITDB_USERNAME'),
  pwd: _getEnv('MONGO_INITDB_PASSWORD'),
  roles: [
    {
      role: 'readWrite',
      db: 'iot-home-automation',
    },
  ],
});
db.container.createIndex({ myfield: 1 }, { unique: true });
db.container.insert({ myfield: 'hello', thatfield: 'testing' });