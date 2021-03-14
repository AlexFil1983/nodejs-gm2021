import { v4 as uuidv4 } from "uuid";
import { Group } from "../models/group.js";
import { isPermissionsValid } from "../services/validation.js";
import { validationResult } from "express-validator";

export const getAllGroups = (req, res) => {
  Group.findAll()
    .then((groups) => res.send(groups))
    .catch((err) => console.log(err));
};

export const newGroup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, permissions } = req.body;
  const permissionArray = permissions.split(",");

  if (!isPermissionsValid(permissionArray)) {
    return res.send(
      "Permissions should be READ, WRITE, DELETE, SHARE or UPLOAD_FILES"
    );
  }
  Group.create({
    id: uuidv4(),
    name,
    permissions: permissionArray,
  }).then((result) => res.send(result));
};

export const deleteGroupById = (req, res) => {
  const groupId = req.params.groupId;
  Group.findByPk(groupId)
    .then((group) => {
      if (!group) {
        return res.status(404).send("Group not found");
      }
      return group.destroy();
    })
    .then(() => res.send("Group deleted successfully!"))
    .catch((err) => console.log(err));
};

export const editGroupById = (req, res) => {
  const groupId = req.params.groupId;
  const { name, permissions } = req.body;
  const permissionArray = permissions.split(",");

  Group.findByPk(groupId)
    .then((group) => {
      if (!group) {
        return res.status(404).send("Group not found");
      }
      if (!isPermissionsValid(permissionArray)) {
        return res.send(
          "Permissions should be READ, WRITE, DELETE, SHARE or UPLOAD_FILES"
        );
      }
      group.name = name;
      group.permissions = permissionArray;
      group
        .save()
        .then(() => res.send(group))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
