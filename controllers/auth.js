const { request, response } = require("express");
const User = require('../models/user.models')
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");


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

const googleSignIn = async (req , res = response) => {
  const { id_token } = req.body;

  try {
    const {name, picture, email} = await googleVerify( id_token );

    let user = await User.findOne({email});
    
    if (!user) {
      // Crear usario
      const data = {
        name,
        email,
        password: ':P',
        picture,
        role: 'USER_ROLE',
        google: true
      };
      user = new User( data );
      await user.save();
    }

    // si el usuario esta en base de datos
    if (!user.state) {
      return res.status(401).json({
        msg: 'Comuniquese con el admistrador del sistema, Usurio Bloqueado'
      });
    };

    // Generar eñ JWT
    const token = await generateJWT( user.id );

    res.json({
      token,
      user
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'El token no se pudo verificar'
    });
  }


};

module.exports = {
  login,
  googleSignIn
};