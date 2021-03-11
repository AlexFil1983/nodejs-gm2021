import express from "express";
const app = express();
import {
  deleteUserById,
  editUserById,
  getUserById,
  getUsersBySubstrAndLimitQuery,
  newUser,
} from "./controllers/index.js";
import {
  ageValidation,
  loginValidation,
  passwordValidaton,
} from "./services/validation.js";

import { sequelize } from "./data-access/sequelize_dbconnect.js";

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/user/:userId", getUserById);

app.get("/users", getUsersBySubstrAndLimitQuery);

app.patch("/user/edit/:userId", ageValidation, passwordValidaton, editUserById);

app.delete("/user/delete/:userId", deleteUserById);

app.post(
  "/user/new",
  ageValidation,
  loginValidation,
  passwordValidaton,
  newUser
);

app.get("/", (req, res) => {
  res.send("Hello");
});

sequelize.sync().then((result) => {
  console.log(result);
  app.listen(3000);
});
