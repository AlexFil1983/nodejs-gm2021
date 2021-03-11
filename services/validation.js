import { body } from "express-validator";
import { User } from "../models/user.js";

export const loginValidation = body("login")
  .not()
  .isEmpty()
  .trim()
  .withMessage("Login is empty")
  .custom((value) => {
    return User.findOne({ where: { login: value } }).then((user) => {
      if (user) {
        return Promise.reject("Login already in use");
      }
    });
  });

export const ageValidation = body("age")
  .isInt({ min: 4, max: 130 })
  .withMessage("Age should be a number between 4 and 130");

export const passwordValidaton = body("password")
  .isStrongPassword({
    minLength: 5,
    minNumbers: 1,
    minSymbols: 0,
    minLowercase: 1,
    minUppercase: 1,
  })
  .withMessage(
    "Please make password with min 5 characters that contains numbers and letters (at least one lowercase and one uppercase)"
  );
