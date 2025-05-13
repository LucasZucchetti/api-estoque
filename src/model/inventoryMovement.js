const Database = require("../database");
const User = require("./user");
const Inventory = require("./inventory");
const Product = require("./product");

class inventoryMovement {
  constructor() {
    this.model = Database.db.define("inventoryMovement", {
      id: {
        type: Database.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: Database.db.Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Database.db.Sequelize.INTEGER,
        allowNull: false,
      },
      inventoryId: {
        type: Database.db.Sequelize.INTEGER,
        references: {
          model: Inventory,
          key: "id",
        },
      },
      userId: {
        type: Database.db.Sequelize.INTEGER,
        references: {
          model: User,
          key: "id",
        },
      },
      productId: {
        type: Database.db.Sequelize.INTEGER,
        references: {
          model: Product,
          key: "id",
        },
      },
    });
    this.model.belongsTo(Inventory, { foreignKey: "inventoryId" });
    this.model.belongsTo(User, { foreignKey: "userId" });
    this.model.belongsTo(Product, { foreignKey: "productId" });
    Inventory.hasMany(this.model, { foreignKey: "inventoryId" });
    User.hasMany(this.model, { foreignKey: "userId" });
    Product.hasMany(this.model, { foreignKey: "productId" });
  }
}

module.exports = new inventoryMovement().model;
