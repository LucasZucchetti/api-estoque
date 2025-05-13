const express = require("express");
const database = require("./src/database");
const userRouter = require("./src/routes/user");
const organizationRouter = require("./src/routes/organization");
const inventoryRouter = require("./src/routes/inventory");
const movementRouter = require("./src/routes/inventoryMovement");
const productRouter = require("./src/routes/product");
const apiUser = require("./src/api/user");

require("dotenv").config();

const port = process.env.DB_PORT;
const app = express();

app.use(express.json());
//login
app.post("/api/v1/login", apiUser.Login);
//comomn routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/organization", organizationRouter);
app.use("/api/v1/inventory", inventoryRouter);
app.use("/api/v1/inventoryMovement", movementRouter);
app.use("/api/v1/product", productRouter);

database.db
  .sync({ force: false })
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error(`Error synchronizing database: ${error}`);
  });
