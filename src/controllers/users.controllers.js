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
    res.json({ success: false, error: "Envía los parámetros necesarios" })
    return
  }


    User.findOne({ email: req.body.email }).then
    ((user) => {
      if (user) {
        {
        res.json({ success: false, error: "El usuario ya existe" })
      }
    }})
  
  try {
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)
    const Users = await User.create({
      name, email, password: hashedPassword
    })
    msgFormatConst('createUsers');
    return res.status(200).json({
      msg: 'Usuario creado',
    })
  } catch (error) {
    console.log(error);
    return res.status(400).json({
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
  //PEDIMOS ESTOS PARAMETROS POR EL BODY
  const { email, password } = req.body
  try {
    //ENCONTRAMOS UN USUARIO
    let foundUser = await User.findOne({ email: email })
    if (!foundUser) {
      //SI NO HUBO UN USUARIO ENCONTRADO, DEVOLVEMOS UN ERROR
      return res.status(400).json({ msg: 'El usuario no existe' })
    }
    //SI TODO ESTA BIEN, HACEMOS LA EVALUACIÓN DE LA CONTRASEÑA ENVIADA CONTRA LA BASE DE DATOS.
    const passRight = await bcryptjs.compare(password, foundUser.password)

    //SI EL USUARIO ES INCORRECTO, REGRESAMOS UN MENSAJE SOBRE ESTO
    if (!passRight) {
      return await res.status(400).json({ msg: 'Contraseña incorrecta' })
    }

    //SI TODO CORRECTO, GENERAMOS UN JSON WEB TOKEN
    //1. DATOS DE ACOMPAÑAMIENTO DEL TOKEN
    const payload = {
      user: {
        id: foundUser.id,
      }
    }
    //2. FIRMA DEL JWT
    if (email && passRight) {
      jwt.sign(payload, process.env.SECRET, { expiresIn: 3600000 }, (error, token) => {
        if (error) throw error
        //SI TODO SUCEDIO CORRECTAMENTE, RETORNAR EL TOKEN
        res.json({ token })
      })
    } else {
      res.json({ msg: 'Hubo un erorr', error })
    }
  }
  catch (error) {
    res.json({ msg: 'Hubo un error al iniciar sesión', error })
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