const express = require("express");
const ApiOrganization = require("../api/organization");
const authMiddleware = require("../middleware/auth");

const orgRouter = express.Router();

orgRouter.get("/:id", authMiddleware("admin"), ApiOrganization.FindById);
orgRouter.post("/", authMiddleware("admin"), ApiOrganization.Create);
orgRouter.put("/:id", authMiddleware("admin"), ApiOrganization.Update);
orgRouter.delete("/:id", authMiddleware("admin"), ApiOrganization.Delete);

module.exports = orgRouter;
