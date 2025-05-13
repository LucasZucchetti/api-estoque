const modelUser = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const roles = ["admin", "employee"];
const salt = 12;
require("dotenv").config();
const secretKey = process.env.J_SECRET;

class ServiceUser {
  async FindById(id, organizationId, transaction) {
    return modelUser.findOne(
      { where: { organizationId, id } },
      { transaction }
    );
  }

  async FindAll(organizationId, transaction) {
    return modelUser.findAll({ where: { organizationId } }, { transaction });
  }

  async Create(organizationId, name, email, password, role, transaction) {
    if (!organizationId) {
      throw new Error("Organization ID is required");
    }

    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    if (!role || !roles.includes(role)) {
      throw new Error("Inform the role correctly");
    }

    const hashPassword = await bcrypt.hash(password, salt);

    return modelUser.create(
      { organizationId, name, email, password: hashPassword, role },
      { transaction }
    );
  }

  async Update(id, organizationId, name, email, password, role, transaction) {
    const oldUser = await this.FindById(id, organizationId, transaction);

    if (!oldUser) {
      throw new Error("User not found");
    }

    if (!organizationId) {
      throw new Error("Organization ID is required");
    }

    if (role && !roles.includes(role)) {
      throw new Error("Inform the role correctly");
    }

    // verify if the user are admin
    if (role && oldUser.role === "admin") {
      oldUser.role = role;
    } else {
      throw new Error("You do not have permission to change the role");
    }

    oldUser.name = name || oldUser.name;
    oldUser.email = email || oldUser.email;
    oldUser.password = password
      ? await bcrypt.hash(password, salt)
      : oldUser.password;

    oldUser.save(
      { organizationId, name, email, password, role },
      { transaction }
    );

    return oldUser;
  }

  async Delete(id, organizationId, transaction) {
    const oldUser = await this.FindById(id, organizationId, transaction);

    if (!oldUser) {
      throw new Error("User not found");
    }

    oldUser.destroy({ transaction });

    return "User deleted successfully";
  }

  async Login(email, password, transaction) {
    if (!email || !password) {
      throw new Error("All fields are required");
    }

    const user = await modelUser.findOne({ where: { email } }, { transaction });

    console.log("🚀 ~ ServiceUser ~ Login ~ user:", user);
    if (!user) {
      throw new Error("Email or password is incorrect");
    }

    const verify = await bcrypt.compare(password, user.password);

    if (verify) {
      return jwt.sign(
        {
          id: user.id,
          role: user.role,
          organizationId: user.organizationId,
        },
        secretKey,
        { expiresIn: 60 * 60 }
      );
    }

    throw new Error("Email or password is incorrect");
  }

  async Verify(id, role, transaction) {
    return modelUser.findOne({ where: { id, role }, transaction });
  }
}

module.exports = new ServiceUser();
