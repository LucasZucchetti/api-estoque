const { Sequelize } = require("sequelize");

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.db = new Sequelize({
      database: "db-inventory",
      username: "root",
      password: "",
      host: "localhost",
      dialect: "mysql",
    });
  }
}

module.exports = new Database();
