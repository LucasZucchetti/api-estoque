const express = require("express");
const ApiInventoryMov = require("../api/inventoryMovement");
const authMiddleware = require("../middleware/auth");

const inventoryMovementRouter = express.Router();

inventoryMovementRouter.get(
  "/:inventoryId/",
  authMiddleware(),
  ApiInventoryMov.FindAll
);
inventoryMovementRouter.get(
  "/:inventoryId/:id",
  authMiddleware(),
  ApiInventoryMov.FindById
);
inventoryMovementRouter.post(
  "/:inventoryId/",
  authMiddleware(),
  ApiInventoryMov.Create
);
inventoryMovementRouter.put(
  "/:inventoryId/:id",
  authMiddleware(),
  ApiInventoryMov.Update
);
inventoryMovementRouter.delete(
  "/:inventoryId/:id",
  authMiddleware(),
  ApiInventoryMov.Delete
);

module.exports = inventoryMovementRouter;
