const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = Schema(
  {
    firebase_id: {
      type: String,
      required: [true, "Firebase id not specified!"],
    },
    userName: {
      type: String,
      trim: true,
      unique: true,
      default: "",
    },
    firstName: {
      type: String,
      trim: true,
      default: "",
    },
    lastName: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: (value) => isEmail(value),
        message: (props) => `The email ${props.value} is not valid`,
      },
    },
    birthday: {
      type: Date,
      trim: true,
      default: "",
    },
    porfileImage: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.index({ userName: "text" });

const User = mongoose.model("user", UserSchema);

module.exports = User;
