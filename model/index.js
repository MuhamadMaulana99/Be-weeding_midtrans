const Sequelize = require("sequelize");

// const sequelize = new Sequelize('dbTokoBangunan', 'postgres', 'postgres', {
//   host: 'localhost',
//   dialect: 'postgres'
// });
const sequelize = new Sequelize("db_weeding_payment_gateway", "root", "", {
  host: "localhost",
  dialect: "mysql", // Ganti dengan dialect yang Anda gunakan
  // dialectOptions: {
  //   charset: 'utf8mb4', // Gunakan utf8mb4
  //   collate: 'utf8mb4_unicode_ci', // Atur collate yang sesuai
  // },
  // logging: console.log, // Aktifkan logging untuk debugging
});
// const loginModel = require('./Auth/loginModels.js')(sequelize, Sequelize.DataTypes);

const midtrans = require("./midtran.js")(sequelize, Sequelize.DataTypes);

const db = {
  sequelize,
  models: {  midtrans },
};
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = db;
