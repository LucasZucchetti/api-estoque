const serviceProduct = require("../service/product");

class ApiProduct {
  async FindById(req, res) {
    try {
      const { id } = req.params;
      const organization = req.session.organizationId;
      const product = await serviceProduct.FindById(id, organization);

      res.status(200).json({
        status: "success",
        data: product,
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
      const products = await serviceProduct.FindAll(organization);

      res.status(200).json({
        status: "success",
        data: products,
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
      const organization = req.session.organizationId;
      const { name, description } = req.body;
      const product = await serviceProduct.Create(
        organization,
        name,
        description
      );

      res.status(200).json({
        status: "success",
        data: product,
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
      const { id, name, description } = req.body;
      const product = await serviceProduct.Update(
        id,
        organization,
        name,
        description
      );

      res.status(200).json({
        status: "success",
        data: product,
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
      await serviceProduct.FindById(id, organization);

      res.status(200).json({
        status: "success",
        message: "Product deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new ApiProduct();
