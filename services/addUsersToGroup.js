import { sequelize } from "../data-access/sequelize_dbconnect.js";
import { Group } from "../models/group.js";
import { User } from "../models/user.js";

export const addUsersToGroup = async (groupId, userIds) => {
  const transaction = await sequelize.transaction();

  try {
    const group = await Group.findByPk(groupId);
    const users = await User.findAll({
      where: {
        id: [...userIds],
      },
    });
    users.forEach((user) => user.addGroup(group));
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
  }
};
