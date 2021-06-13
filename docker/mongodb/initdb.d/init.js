const error = true;

const res = [
  db.container.drop(),
  db.createUser({
    user: _getEnv('MONGO_INITDB_ROOT_USERNAME'),
    pwd: _getEnv('MONGO_INITDB_ROOT_PASSWORD'),
    roles: [
      {
        role: 'readWrite',
        db: _getEnv('MONGO_INITDB_DATABASE'),
      },
    ],
  }),
  db.container.createIndex({ myfield: 1 }, { unique: true }),
  db.container.createIndex({ thatfield: 1 }),
  db.container.createIndex({ thatfield: 1 }),
  db.container.insert({ myfield: 'hello', thatfield: 'testing' }),
  db.container.insert({ myfield: 'hello2', thatfield: 'testing' }),
  db.container.insert({ myfield: 'hello3', thatfield: 'testing' }),
  db.container.insert({ myfield: 'hello3', thatfield: 'testing' }),
];

printjson(res);
if (error) {
  print('Error, exiting');
  quit(1);
}
