const Database = require("../database");
const Organization = require("./organization");

class Inventory {
  constructor() {
    this.model = Database.db.define('inventory', {
      id: {
        type: Database.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Database.db.Sequelize.STRING,
        allowNull: false,
      },
      organizationId: {
        type: Database.db.Sequelize.INTEGER,
        references: {
          model: Organization,
          key: 'id',
        },
      },
    })
    this.model.belongsTo(Organization, { foreignKey: 'organizationId' })
    Organization.hasMany(this.model, { foreignKey: 'organizationId' })
  }
}

module.exports = new Inventory().model