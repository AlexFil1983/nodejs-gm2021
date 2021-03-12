import express from "express";
const app = express();
import { sequelize } from "./data-access/sequelize_dbconnect.js";
import { userRoutes } from "./routes/users.js";

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(userRoutes);

sequelize.sync().then((result) => {
  console.log(result);
  app.listen(3000);
});
