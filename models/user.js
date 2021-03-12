import pkg from "sequelize";
const { Sequelize } = pkg;
import { sequelize } from "../data-access/sequelize_dbconnect.js";

export const User = sequelize.define("user", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  login: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});
