module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: process.env.DB_HOST || 'still4steel',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'memodb',
      },
      migrations: {
        tableName: 'knex_migrations',
      },
    },
  };
  