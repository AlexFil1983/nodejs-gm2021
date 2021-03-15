import { Group } from "../models/group.js";
import { User } from "../models/user.js";

export const addUsersToGroup = async (groupId, userIds) => {
  const group = await Group.findByPk(groupId);
  const users = await User.findAll({
    where: {
      id: [...userIds],
    },
  });
  users.map((user) => user.addGroup(group));
};
