const generatePassword = require("../fns/generate-password");
const ModelOrganization = require("../model/organization");
const ServiceUser = require("./user");

class ServiceOrganization {
  async FindById(id, transaction) {
    return ModelOrganization.findByPk(id, { transaction });
  }

  async Create(name, address, phone, email, transaction) {
    if (!name || !address || !phone || !email) {
      throw new Error("All fields are required");
    }

    const organization = await ModelOrganization.create(
      { name, address, phone, email },
      { transaction }
    );

    // Crate a new user admin when creating an organization
    const password = generatePassword();
    const user = await ServiceUser.Create(
      organization.id,
      `Admin ${name}`,
      email,
      password,
      "admin",
      transaction
    );

    return { organization, user: { ...user.dataValues, password } };
  }

  async Update(id, name, address, phone, email, transaction) {
    const organization = await this.FindById(id, transaction);

    if (!organization) {
      throw new Error("Organization not found");
    }

    organization.name = name || organization.name;
    organization.address = address || organization.address;
    organization.phone = phone || organization.phone;
    organization.email = email || organization.email;

    return organization.save({ transaction });
  }

  async Delete(id, transaction) {
    const organization = await this.FindById(id, transaction);

    if (!organization) {
      throw new Error("Organization not found");
    }

    organization.destroy({ transaction });

    return "Organization deleted successfully";
  }
}

module.exports = new ServiceOrganization();
