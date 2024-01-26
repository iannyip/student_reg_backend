require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
  },
  production: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    // use_env_variable: 'DATABASE_URL',
    // dialect: 'postgres',
    // protocol: 'postgres',
    // dialectOptions: {
    //   ssl: { // https://github.com/sequelize/sequelize/issues/12083
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  },
};
