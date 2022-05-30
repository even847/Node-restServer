const { response, request } = require("express");

const bcryptjs = require("bcryptjs");
const User = require("../models/user.models");
const { Promise } = require("mongoose");

const usersGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { state: true};

  // const users = await User.find(query).skip(Number(desde)).limit(Number(limite));
  // const total = await User.countDocuments(query);

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(desde)).limit(Number(limite))
  ]);

  res.json({
    total,
    users,
  });
};

const usersPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //Verficar si el correo existe
  // const existeEmail = await User.findOne({ email });
  // if ( existeEmail ) {
  //   return res.status(400).json({
  //     msg: 'El correo ya está registrado'
  //   });
  // };

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Guardar en la BD
  await user.save();

  res.status(201).json({
    user,
  });
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...resto } = req.body;

  if (password) {
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, resto);

  res.status(400).json({
    msg: "put API - Controller",
    user,
  });
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: "patch API - Controller",
  });
};

const usersDelete = async (req, res = response) => {

  const { id } = req.params;
  // Fisicamente lo borramos
  // const user = await User.findByIdAndDelete( id );

  // Cambiando el estado del usuario
  const user = await User.findByIdAndUpdate(id, {state: false});

  res.json(user);
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
