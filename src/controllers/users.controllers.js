const User = require("../models/UserSchema");
const { respApi, msgFormatCons } = require('../helpers/helpers');
const JsonWebToken = require("jsonwebtoken");
const Bcrypt = require("bcryptjs");

// localhost:5000/users/signup
const userSignup = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      msgFormatCons("Error al crear usuario");
      res.json({ success: false, error: "Envía los parámetros necesarios" })
      return
    }
    msgFormatCons("Creando usuario");
    const data = {
      email: req.body.email,
      password: Bcrypt.hashSync(req.body.password, 10)
    };
    User.create(data).then((user) => {
      const token = JsonWebToken.sign({ id: user._id, email: user.email }, process.env.SECRET_JWT_CODE)
      res.json({ success: true, token: token })
    }).catch((err) => {
      res.json({ success: false, error: err })
    })
  } catch {
    res.status(500).json({
      msg: "Hubo un error al obtener los datos",
    });
  }
};


// localhost:5000/users/login
const userLogin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      msgFormatCons("Error al logearse el usuario");
      res.json({ success: false, error: "Envía los parámetros necesarios" })
      return
    }
    msgFormatCons("Logeo de usuario");
    const data = {
      email: req.body.email,
      password: Bcrypt.hashSync(req.body.password, 10)
    };
    User.findOne({ email: req.body.email }).then
      ((user) => {
        if (!user) {
          res.json({ success: false, error: "El usuario no existe" })
        } else {
          if (!Bcrypt.compareSync(req.body.password, user.password)) {
            res.json({ success: false, error: "Password no correcto" })
          } else {
            const token = JsonWebToken.sign({ id: user._id, email: user.email }, process.env.SECRET_JWT_CODE)
            res.json({ success: true, token: token })
          }
        }
      })
  } catch {
    res.status(500).json({
      msg: "Hubo un error al obtener los datos",
    });
  }
}

module.exports = {
  userSignup,
  userLogin
};
