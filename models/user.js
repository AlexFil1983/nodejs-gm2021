import pkg from "sequelize";
const { Sequelize, Model } = pkg;
import { sequelize } from "../data-access/sequelize_dbconnect.js";
import { Group } from "../models/group.js";

export class User extends Model {
  addUsersToGroup = async (groupId, userIds) => {
    const group = await Group.findByPk(groupId);
    const users = await User.findAll({
      where: {
        id: [...userIds],
      },
    });
    users.map((user) => user.addGroup(group));
  };
}

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
