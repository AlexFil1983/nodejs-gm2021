import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";
import { User } from "../models/user.js";
import pkg from "sequelize";
const { Op } = pkg;

export const getUserById = async (req, res) => {
  const userId = req.params.userId;
  User.findByPk(userId).then((user) => {
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  });
};

export const getUsersBySubstrAndLimitQuery = (req, res) => {
  let userSubstring = req.query.login ? req.query.login : "";
  let usersLimit = req.query.limit ? req.query.limit : null;

  if (userSubstring.length > 0) {
    console.log("substr");
    User.findAll({
      where: {
        login: {
          [Op.iLike]: userSubstring + "%",
        },
      },
    })
      .then((users) => {
        if (users.length === 0) {
          res.send("Users with this parameters not found");
        }
        return res.send(usersLimit ? users.slice(0, usersLimit) : users);
      })
      .catch((err) => console.log(err));
  }
  User.findAll()
    .then((users) => res.send(usersLimit ? users.slice(0, usersLimit) : users))
    .catch((err) => console.log(err));
};

export const editUserById = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const userId = req.params.userId;
  const { password, age } = req.body;
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }
      user.password = password;
      user.age = age;
      user.save();
      res.send(user);
    })
    .catch((err) => console.log(err));
};

export const deleteUserById = (req, res) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }
      user.isDeleted = true;
      user.save();
      res.send(user);
    })
    .catch((err) => console.log(err));
};

export const newUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { login, password, age } = req.body;
  User.create({
    login,
    password,
    age,
    id: uuidv4(),
    isDeleted: false,
  })
    .then((result) => {
      res.send("User created!");
    })
    .catch((err) => console.log(err));
};
