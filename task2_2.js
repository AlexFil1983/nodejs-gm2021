import express from "express";
import { dummy_users } from "./user_data/dummy_users.js";
const app = express();
import { v4 as uuidv4 } from "uuid";
import { body, validationResult } from "express-validator";

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  const filteredUser = dummy_users.find((user) => user.id === +userId);
  if (!filteredUser) {
    res.send("User not found. Try another id");
  }
  res.send(filteredUser);
});

app.get("/users", (req, res) => {
  let userSubstring = "";
  let filteredUsers = [...dummy_users];
  let usersLimit = null;

  if (req.query.login) {
    userSubstring = req.query.login.toLowerCase();
    usersLimit = req.query.limit;
    filteredUsers = dummy_users.filter((user) =>
      user.login.toLowerCase().includes(userSubstring)
    );
  }
  if (!filteredUsers) {
    res.send("Users not found. Try another login");
  }

  usersLimit
    ? res.send(filteredUsers.slice(0, usersLimit))
    : res.send(filteredUsers);
});

app.patch("/user/edit/:userId", (req, res) => {
  const userId = req.params.userId;
  const { password, age } = req.body;
  const editUserIdx = dummy_users.findIndex((user) => user.id === +userId);
  if (editUserIdx === -1) {
    return res.send("Can't edit. User not found. Try another id");
  }
  const editedUser = { ...dummy_users[editUserIdx], password, age };
  dummy_users[editUserIdx] = editedUser;
  console.log("User edited");
  res.send(dummy_users[editUserIdx]);
});

app.delete("/user/delete/:userId", (req, res) => {
  const userId = req.params.userId;
  const deleteUserIndex = dummy_users.findIndex((user) => user.id == userId);

  if (deleteUserIndex === -1) {
    return res
      .status(404)
      .send("Could not delete, user not found. Try another id");
  }
  dummy_users[deleteUserIndex].isDeleted = true;
  res.send(dummy_users);
  console.log("User deleted");
});

app.post(
  "/user/new",
  body("login").not().isEmpty().trim().withMessage("Login is empty"),
  body("age")
    .isInt({ min: 4, max: 130 })
    .withMessage("Age should be a number between 4 and 130"),
  body("password")
    .isStrongPassword({
      minLength: 5,
      minNumbers: 1,
      minSymbols: 0,
      minLowercase: 0,
      minUppercase: 0,
    })
    .withMessage(
      "Please make password with min 5 characters that contains letters and numbers"
    ),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { login, password, age } = req.body;
    const newUser = {
      login,
      password,
      age: Number(age),
      id: uuidv4(),
      isDeleted: false,
    };
    dummy_users.push(newUser);
    res.send(dummy_users);
  }
);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("Running server");
});
