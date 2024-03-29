//Controladores 
const User = require('./../models/UserSchema');
const { msgFormatConst, respApi } = require('../helpers/helpers');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

//GET
//para filtrar la información es por medio de query params, 
//porque GET no soporta recibir parametros por body (no soporta el req.body, es req.params)
const getUsers = async (req, res) => {
  try {
    const Users = await User.find({})
    msgFormatConst('getUsers');
    respApi(res, 'success', Users);
  } catch (error) {
    res.status(500).json({ msg: 'Hubo un error obteniendo los datos' })
  }

}
//CREATE
const createUser = async (req, res) => {
  const { name, email, password } = req.body
  if (!req.body.email || !req.body.password) {
    msgFormatConst("Error al crear usuario");
    res.json({ success: false, msg: "Envía los parámetros necesarios" })
    return
  }
  try {
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)
    User.findOne({ email: req.body.email }).then
      ((user) => {
        if (user) {
          {
            return res.json({ success: false, msg: "El usuario ya existe" })
          }
        } else {
          User.create({
            email, password: hashedPassword
          })
          msgFormatConst('createUsers');
          return res.status(200).json({
            success: true,
            msg: 'Usuario creado',
          })
        }
      })


  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      msg: error,
    })
  }
}
//VERIFY AUTORIZACION
const verifyUser = async (req, res) => {
  try {
    //CONFIRMAMOS QUE EL USUARIO EXISTA EN LA BD Y RETORNAMOS SUS DATOS, EXCLUYENDO EL PASSWORD
    const usuario = await User.findById(req.user.id).select('-password')
    res.json({ usuario })
    msgFormatConst('verifyUsers');
  } catch (error) {
    res.status(500).json({
      msg: 'Hubo un error al verificar el usuario',
      error,
    })
  }
}

//LOGIN
const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    let foundUser = await User.findOne({ email: email })
    if (!foundUser) {
      return res.json({ success: false, msg: 'El usuario no existe' })
    }
    const passRight = await bcryptjs.compare(password, foundUser.password)
    if (!passRight) {
      return await res.json({ success: false, msg: 'Contraseña incorrecta' })
    }
    const payload = {
      user: {
        id: foundUser.id,
      }
    }
    if (email && passRight) {
      jwt.sign(payload, process.env.SECRET_JWT_CODE, { expiresIn: 3600000 }, (error, token) => {
        if (error) throw error
        res.json({ success: true, token: token })
      })
    } else {
      res.json({ success: false, msg: 'Hubo un error', error })
    }
  }
  catch (error) {
    console.log(error);
    res.json({ success: false, msg: 'Hubo un error al iniciar sesión', error })
  }
}

//UPDATE
const updateUser = async (req, res) => {
  //PEDIMOS ESTOS PARAMETROS POR EL BODY
  const { id, name, email } = req.body
  try {
    const updateCustom = await User.findByIdAndUpdate(id, { name, email }, { new: true })

    msgFormatConst('updateUsers');
  } catch (error) {
    res.status(500).json({
      msg: 'Hubo un error actualizando el usuario',
    })
  }


}
//DELETE
const deleteUser = async (req, res) => {
  //PEDIMOS EL ID POR EL BODY
  const { id } = req.body
  try {
    const deleteCustom = await User.findByIdAndRemove({ _id: id })
    res.json(deleteCustom)

    msgFormatConst('deleteUsers');
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error borrando el usuario especificado"
    })
  }
}

module.exports = {
  getUsers,
  createUser,
  loginUser,
  verifyUser,
  updateUser,
  deleteUser

}