const modelProduct = require("../model/product");

class ServiceProduct {
  async FindById(id, organizationId, transaction) {
    return modelProduct.findOne(
      { where: { organizationId, id } },
      { transaction }
    );
  }

  async FindAll(organizationId, transaction) {
    return modelProduct.findAll({ where: { organizationId } }, { transaction });
  }

  async Create(organizationId, name, description, transaction) {
    if (!organizationId) {
      throw new Error("Organization ID is required");
    }

    if (!name || !description) {
      throw new Error("All fields are required");
    }

    return modelProduct.create(
      { organizationId, name, description },
      { transaction }
    );
  }

  async Update(id, organizationId, name, description, transaction) {
    const oldProduct = await this.FindById(id, organizationId, transaction);

    if (!oldProduct) {
      throw new Error("Product not found");
    }

    if (!organizationId) {
      throw new Error("Organization ID is required");
    }

    oldProduct.name = name || oldProduct.name;
    oldProduct.description = description || oldProduct.description;

    return oldProduct.save(
      { organizationId, name, description },
      { transaction }
    );
  }

  async Delete(id, organizationId, transaction) {
    const oldProduct = await this.FindById(id, organizationId, transaction);

    if (!oldProduct) {
      throw new Error("Product not found");
    }

    oldProduct.destroy({ transaction });

    return "Product deleted successfully";
  }
}

module.exports = new ServiceProduct();
