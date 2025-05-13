const serviceOrganization = require("../service/organization");

class ApiOrganization {
  async FindById(req, res) {
    try {
      const { id } = req.params;
      const organization = await serviceOrganization.FindById(id);

      res.status(200).json({
        status: "success",
        data: organization,
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
      const { name, address, phone, email } = req.body;
      const organization = await serviceOrganization.Create(
        name,
        address,
        phone,
        email
      );

      res.status(200).json({
        status: "success",
        data: organization,
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
      const { name, address, phone, email } = req.body;
      const organization = await serviceOrganization.Update(
        id,
        name,
        address,
        phone,
        email
      );

      res.status(200).json({
        status: "success",
        data: organization,
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
      const organization = await serviceOrganization.Delete(id);

      res.status(200).json({
        status: "success",
        data: organization,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new ApiOrganization();
