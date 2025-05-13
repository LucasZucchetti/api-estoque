const modelInventory = require("../model/inventory");
const inventoryMovement = require("../service/inventoryMovement");
const getProductMovements = require("../fns/get-product-movements");

class ServiceInventory {
  async FindById(id, organizationId, transaction) {
    const inventory = await modelInventory.findOne(
      { where: { organizationId, id } },
      { transaction }
    );

    if (!inventory) {
      throw new Error("Inventory not found");
    }

    const movements = await inventoryMovement.FindAll(inventory.id);
    // console.log("🚀~ movements:", movements);

    const result = getProductMovements(movements);
    console.log("🚀~ result:", result);

    return { ...inventory.dataValues, ...result };
  }

  async FindAll(organizationId, transaction) {
    return modelInventory.findAll(
      { where: { organizationId } },
      { transaction }
    );
  }

  async Create(organizationId, name, transaction) {
    if (!organizationId) {
      throw new Error("Organization ID is required");
    }

    if (!name) {
      throw new Error("Name is required");
    }

    return modelInventory.create({ organizationId, name }, { transaction });
  }

  async Update(id, name, organizationId, transaction) {
    const oldInventory = await modelInventory.findOne(
      { where: { organizationId, id } },
      { transaction }
    );

    if (!oldInventory) {
      throw new Error("Inventory not found");
    }

    if (!organizationId) {
      throw new Error("Organization ID is required");
    }

    oldInventory.name = name || oldInventory.name;

    return oldInventory.save({ transaction });
  }

  async Delete(id, organizationId, transaction) {
    const oldInventory = await this.FindById(id, organizationId, transaction);

    if (!oldInventory) {
      throw new Error("Inventory not found");
    }

    oldInventory.destroy({ transaction });

    return "Inventory deleted successfully";
  }
}

module.exports = new ServiceInventory();
