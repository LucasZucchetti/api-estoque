const express = require("express");
const ApiProduct = require("../api/product");
const authMiddleware = require("../middleware/auth");

const productRouter = express.Router();

productRouter.get("/:id", authMiddleware(), ApiProduct.FindById);
productRouter.get("/", authMiddleware(), ApiProduct.FindAll);
productRouter.post("/", authMiddleware(), ApiProduct.Create);
productRouter.put("/", authMiddleware(), ApiProduct.Update);
productRouter.delete("/", authMiddleware(), ApiProduct.Delete);

module.exports = productRouter;
