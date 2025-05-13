const Database = require("../database");
const Organization = require("./organization");

class User {
  constructor() {
    this.model = Database.db.define("users", {
      id: {
        type: Database.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Database.db.Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Database.db.Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Database.db.Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Database.db.Sequelize.STRING,
        allowNull: false,
      },
      organizationId: {
        type: Database.db.Sequelize.INTEGER,
        references: {
          model: Organization,
          key: "id",
        },
      },
    });
    this.model.belongsTo(Organization, { foreignKey: "organizationId" });
    Organization.hasMany(this.model, { foreignKey: "organizationId" });
  }
}

module.exports = new User().model;
