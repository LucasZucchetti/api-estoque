const ServiceUser = require("../service/user");

class ApiUser {
  async FindById(req, res) {
    try {
      const { id } = req.params;
      const organization = req.session.organizationId;
      const user = await ServiceUser.FindById(id, organization);

      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async FindAll(req, res) {
    try {
      const organization = req.session.organizationId;
      const user = await ServiceUser.FindAll(organization);

      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async Create(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const organization = req.session.organizationId;

      const user = await ServiceUser.Create(
        organization,
        name,
        email,
        password,
        role
      );

      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async Update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password, role } = req.body;
      const organization = req.session.organizationId;

      const user = await ServiceUser.Update(
        id,
        organization,
        name,
        email,
        password,
        role
      );

      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async Delete(req, res) {
    try {
      const { id } = req.params;
      const organization = req.session.organizationId;
      const user = await ServiceUser.Delete(id, organization);

      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async Login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await ServiceUser.Login(email, password);

      res.status(200).json({
        status: "success",
        token,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new ApiUser();
