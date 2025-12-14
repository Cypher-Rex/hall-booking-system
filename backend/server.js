require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/db");

sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
