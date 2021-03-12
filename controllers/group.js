import { v4 as uuidv4 } from "uuid";
import { Group } from "../models/group.js";

export const getAllGroups = (req, res) => {
  Group.findAll()
    .then((groups) => res.send(groups))
    .catch((err) => console.log(err));
};

export const newGroup = (req, res) => {
  const { name, permissions } = req.body;
  const permissionsArray = permissions.split(",");
  const validPermissions = ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"];
  const invalidPermissions = permissionsArray.filter(
    (permission) => !validPermissions.includes(permission)
  );
  if (invalidPermissions.length > 0) {
    return res.send(
      "Permissions should be READ, WRITE, DELETE, SHARE or UPLOAD_FILES"
    );
  }
  Group.create({
    id: uuidv4(),
    name,
    permissions: permissionsArray,
  }).then((result) => res.send(result));
};
