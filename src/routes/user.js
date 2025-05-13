const express = require("express");
const ApiUser = require("../api/user");
const authMiddleware = require("../middleware/auth");

const userRouter = express.Router();
//user
userRouter.get("/info", authMiddleware(), ApiUser.FindById);
userRouter.put("/", authMiddleware(), ApiUser.Update);
userRouter.delete("/", authMiddleware(), ApiUser.Delete);
//admin
userRouter.post("/", authMiddleware("admin"), ApiUser.Create);
userRouter.get("/:id", authMiddleware("admin"), ApiUser.FindById);
userRouter.get("/", authMiddleware("admin"), ApiUser.FindAll);
userRouter.put("/:id", authMiddleware("admin"), ApiUser.Update);
userRouter.delete("/:id", authMiddleware("admin"), ApiUser.Delete);

module.exports = userRouter;
