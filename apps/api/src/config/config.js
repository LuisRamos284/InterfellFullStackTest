const path = require("path");

require("dotenv-safe").config({
  allowEmptyValues: true,
  path: path.join(__dirname, "../../.env"),
});

const config = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  dialect: "mysql",
};

console.log(config)

// need to have all these defined for sequelize migrations (except config, which we are using)
module.exports = {
  config,
  development: config,
  production: config,
};
