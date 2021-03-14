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

export const isPermissionsValid = (permissionArray) => {
  const validPermissions = ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"];
  const invalidPermissions = permissionArray.filter(
    (permission) => !validPermissions.includes(permission)
  );
  if (invalidPermissions.length > 0) {
    return false;
  }
  return true;
};

export const isPermissionEmpty = body("permissions")
  .not()
  .isEmpty()
  .trim()
  .withMessage("Permissions is empty");

export const isGroupNameEmpty = body("name")
  .not()
  .isEmpty()
  .trim()
  .withMessage("Group name is empty");
