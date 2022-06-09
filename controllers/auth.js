const { request, response } = require("express");
const User = require('../models/user.models')
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");


const login = async (req = request, res = response) => {

  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const user = await User.findOne({ email });
    if (!user ) {
      return res.status(400).json({
        msg: 'Usuario / Contraseña no son válidos - Email'
      });
    }

    // Si el usuario está activo
    if (!user.state ) {
      return res.status(400).json({
        msg: 'Usuario / Contraseña no son válidos - Estado: false'
      });
    }

    // Verficiar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Contraseña no son válidos - Password'
      });
    }

    // Generar eñ JWT
    const token = await generateJWT( user.id );



    res.json({
      user,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Comuniquese con el administrador'
    });
  }





};


module.exports = {
  login
};