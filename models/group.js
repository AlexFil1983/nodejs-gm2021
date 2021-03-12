import pkg from "sequelize";
const { Sequelize } = pkg;
import { sequelize } from "../data-access/sequelize_dbconnect.js";

// const Permission = ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"];

export const Group = sequelize.define("group", {
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
});
