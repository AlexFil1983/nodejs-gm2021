import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";
import { User } from "../models/user.js";
import pkg from "sequelize";
import { Group } from "../models/group.js";
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
  const userSubstring = req.query.login ? req.query.login : "";
  const limit = req.query.limit ? req.query.limit : null;

  if (userSubstring.length > 0) {
    console.log("yes");
    User.findAll({
      where: {
        login: {
          [Op.iLike]: userSubstring + "%",
        },
      },
      limit,
    })
      .then((users) => {
        if (users.length === 0) {
          return res.send("Users with this parameters not found");
        }
        return res.send(users);
      })
      .catch((err) => console.log(err));
  }
  User.findAll({ limit })
    .then((users) => {
      return res.send(users);
    })
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

export const newUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { login, password, age, groupId } = req.body;
  const group = await Group.findByPk(groupId);

  await User.create({
    login,
    password,
    age,
    id: uuidv4(),
    isDeleted: false,
  })
    .then((user) => {
      user.addGroup(group);
      res.send("User created!");
    })
    .catch((err) => console.log(err));
};
