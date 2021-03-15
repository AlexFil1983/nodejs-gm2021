import pkg from "sequelize";
const { Sequelize, Model } = pkg;
import { sequelize } from "../data-access/sequelize_dbconnect.js";

export class User extends Model {}
User.init(
  {
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
  },
  { sequelize, modelName: "user" }
);
