import express from "express";
const app = express();
import { sequelize } from "./data-access/sequelize_dbconnect.js";
import { Group } from "./models/group.js";
import { User } from "./models/user.js";
import { groupRoutes } from "./routes/groups.js";
import { userRoutes } from "./routes/users.js";

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use("/users", userRoutes);
app.use("/groups", groupRoutes);

User.belongsToMany(Group, { through: "UserGroup", foreignKey: "userId" });
Group.belongsToMany(User, { through: "UserGroup", foreignKey: "groupId" });

sequelize.sync().then((result) => {
  app.listen(3000);
});
