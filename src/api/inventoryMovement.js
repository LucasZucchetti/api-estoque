const serviceInventoryMovement = require("../service/inventoryMovement");

class ApiInventoryMov {
  async FindById(req, res) {
    try {
      const { inventoryId, id } = req.params;
      const inventoryMov = await serviceInventoryMovement.FindById(
        inventoryId,
        id
      );

      res.status(200).json({
        status: "success",
        data: inventoryMov,
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
      const { inventoryId } = req.params;
      const inventoryMov = await serviceInventoryMovement.FindAll(inventoryId);

      res.status(200).json({
        status: "success",
        data: inventoryMov,
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
      const userId = 1;
      const { inventoryId } = req.params;
      const { type, amount, productId } = req.body;
      const inventoryMov = await serviceInventoryMovement.Create(
        inventoryId,
        userId,
        type,
        amount,
        productId
      );

      res.status(200).json({
        status: "success",
        data: inventoryMov,
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
      const { id, inventoryId } = req.params;
      const { type, amount, productId } = req.body;
      const inventoryMov = await serviceInventoryMovement.Update(
        id,
        inventoryId,
        type,
        amount
      );

      res.status(200).json({
        status: "success",
        data: inventoryMov,
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
      const { id, inventoryId } = req.params;
      const inventoryMov = await serviceInventoryMovement.Delete(
        id,
        inventoryId
      );

      res.status(200).json({
        status: "success",
        data: inventoryMov,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new ApiInventoryMov();
