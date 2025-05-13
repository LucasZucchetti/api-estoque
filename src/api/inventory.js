const serviceInventory = require("../service/inventory");

class ApiInventory {
  async FindById(req, res) {
    try {
      const { id } = req.params;
      const organization = req.session.organizationId;
      const inventory = await serviceInventory.FindById(id, organization);

      res.status(200).json({
        status: "success",
        data: inventory,
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
      const inventory = await serviceInventory.FindAll(organization);

      res.status(200).json({
        status: "success",
        data: inventory,
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
      const { name } = req.body;
      const organization = req.session.organizationId;
      const inventory = await serviceInventory.Create(organization, name);

      res.status(200).json({
        status: "success",
        data: inventory,
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
      const organization = req.session.organizationId;
      const { id } = req.params;
      const { name } = req.body;
      const inventory = await serviceInventory.Update(id, name, organization);

      res.status(200).json({
        status: "success",
        data: inventory,
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
      const organization = req.session.organizationId;
      const { id } = req.params;
      const inventory = await serviceInventory.Delete(id, organization);

      res.status(200).json({
        status: "success",
        data: inventory.data,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new ApiInventory();
