import pkg from "sequelize";
const { Sequelize, Model } = pkg;
import { sequelize } from "../data-access/sequelize_dbconnect.js";

export class Group extends Model {}
Group.init(
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    permissions: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
  },
  { sequelize, modelName: "group" }
);
