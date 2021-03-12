import express from "express";
const groupRoutes = express.Router();
import { getAllGroups, newGroup } from "../controllers/group.js";

groupRoutes.get("/groups", getAllGroups);
groupRoutes.post("/new", newGroup);
export { groupRoutes };
