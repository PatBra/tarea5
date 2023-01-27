const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
/*

const crypto = require('crypto')*/

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Ingrese su nombre."],
    maxLength: [30, "Su nombre no puede tener mas de 30 caracteres."],
  },
  email: {
    type: String,
    required: [true, "Ingrese su email"],
    unique: true,
    validate: [validator.isEmail, "Ingrese un email válido."],
  },
  password: {
    type: String,
    required: [true, "Ingrese su clave."],
    minlength: [6, "Su clave debe tener mas de 6 caracteres."],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Encrypting password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});
//Retorna JWT Token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

module.exports = mongoose.model("User", userSchema);
