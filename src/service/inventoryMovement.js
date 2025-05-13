const modelInventoryMovement = require("../model/inventoryMovement");
const product = require("../model/product");
const movementTypes = ["In", "Out"];

class ServiceInventoryMovement {
  async FindById(id, inventoryId, transaction) {
    return modelInventoryMovement.findOne(
      { where: { inventoryId, id }, include: { model: product } },
      { transaction }
    );
  }

  async FindAll(inventoryId, transaction) {
    return modelInventoryMovement.findAll(
      { where: { inventoryId }, include: { model: product } },
      { transaction }
    );
  }

  async Create(inventoryId, userId, type, amount, productId, transaction) {
    if (!inventoryId) {
      throw new Error("Inventory ID is required");
    }

    if (!userId) {
      throw new Error("User ID is required");
    }

    if (!productId) {
      throw new Error("Product ID is required");
    }

    if (!type || !movementTypes.includes(type)) {
      throw new Error("Only 'In' and 'Out' types are allowed");
    }

    if (!amount || isNaN(amount)) {
      throw new Error("Amount is required and must be a number");
    }

    return modelInventoryMovement.create(
      { inventoryId, userId, type, amount, productId },
      { transaction }
    );
  }

  async Update(id, inventoryId, type, amount, transaction) {
    const oldInventoryMovement = await this.FindById(
      id,
      inventoryId,
      transaction
    );

    if (!oldInventoryMovement) {
      throw new Error("Inventory not found");
    }

    if (type && !movementTypes.includes(type)) {
      throw new Error("Only 'In' and 'Out' types are allowed");
    }

    oldInventoryMovement.type = type || oldInventoryMovement.type;
    oldInventoryMovement.amount = amount || oldInventoryMovement.amount;

    return oldInventoryMovement.save(
      { inventoryId, userId, type, amount, productId },
      { transaction }
    );
  }

  async Delete(id, inventoryId, transaction) {
    const oldInventoryMovement = await this.FindById(
      id,
      inventoryId,
      transaction
    );

    if (!oldInventoryMovement) {
      throw new Error("Inventory movement not found");
    }

    oldInventoryMovement.destroy({ transaction });

    return "Inventory movement deleted successfully";
  }
}

module.exports = new ServiceInventoryMovement();
