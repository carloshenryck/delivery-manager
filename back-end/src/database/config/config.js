require('dotenv').config();

const environment = process.env.NODE_ENV || "test";

const suffix = {
  prod: "",
  production: "",
  dev: "-dev",
  development: "-dev",
  test: "-test",
};

const options = {
  host: process.env.MYSQLHOST || process.env.HOSTNAME || 'localhost',
  port: process.env.MYSQLPORT || '3306',
  database: `${process.env.MYSQLDATABASE || 'delivery-app'}${process.env.MYSQLDATABASE ? '' : suffix[environment] || suffix.test}`,
  username: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '123456',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

console.log(process.env.MYSQLHOST, process.env.MYSQLPORT, process.env.MYSQLDATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD);

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};
