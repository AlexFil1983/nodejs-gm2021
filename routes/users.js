import express from "express";
import {
  deleteUserById,
  editUserById,
  getUserById,
  getUsersBySubstrAndLimitQuery,
  newUser,
} from "../controllers/index.js";
import {
  ageValidation,
  loginValidation,
  passwordValidaton,
} from "../services/validation.js";
const userRoutes = express.Router();

userRoutes.get("/user/:userId", getUserById);

userRoutes.get("/users", getUsersBySubstrAndLimitQuery);

userRoutes.patch(
  "/user/edit/:userId",
  ageValidation,
  passwordValidaton,
  editUserById
);

userRoutes.delete("/user/delete/:userId", deleteUserById);

userRoutes.post(
  "/user/new",
  ageValidation,
  loginValidation,
  passwordValidaton,
  newUser
);

userRoutes.get("/", (req, res) => {
  res.send("Hello");
});

export { userRoutes };
