import express from "express";
import {
  deleteUserById,
  editUserById,
  getUserById,
  getUsersBySubstrAndLimitQuery,
  newUser,
} from "../controllers/user.js";
import {
  ageValidation,
  loginValidation,
  passwordValidaton,
} from "../services/validation.js";
const userRoutes = express.Router();

userRoutes.get("/all", getUsersBySubstrAndLimitQuery);

userRoutes.post(
  "/new",
  ageValidation,
  loginValidation,
  passwordValidaton,
  newUser
);

userRoutes.get("/:userId", getUserById);

userRoutes.patch(
  "/edit/:userId",
  ageValidation,
  passwordValidaton,
  editUserById
);

userRoutes.delete("/delete/:userId", deleteUserById);

export { userRoutes };
