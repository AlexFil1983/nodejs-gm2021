import express from "express";
const groupRoutes = express.Router();
import {
  deleteGroupById,
  editGroupById,
  getAllGroups,
  newGroup,
} from "../controllers/group.js";
import { isPermissionEmpty, isGroupNameEmpty } from "../services/validation.js";

groupRoutes.get("/all", getAllGroups);
groupRoutes.post("/new", isPermissionEmpty, isGroupNameEmpty, newGroup);
groupRoutes.delete("/delete/:groupId", deleteGroupById);
groupRoutes.patch("/edit/:groupId", editGroupById);
export { groupRoutes };
