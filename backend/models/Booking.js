const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Booking = sequelize.define("Booking", {
  mobileNo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hallName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  applicantName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  purpose: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rent: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  additionalCharges: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  remark: {
    type: DataTypes.STRING,
    allowNull: true
  },
  receiptNo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  receiptDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
});

module.exports = Booking;
