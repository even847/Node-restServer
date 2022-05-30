const Role = require("../models/role");
const User = require("../models/user.models");

const isRoleValidate = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`El Rol ${role} no está registrado en la base de datos`);
  }
};

//Verficar si el correo existe
const emailExist = async ( email = '' ) => {
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    throw new Error(`El correo electrónico: ${ email }, ya está registrado`);
  }
};

const existUserById = async ( id ) => {
  const existUser = await User.findById(id);
  if ( !existUser ) {
    throw new Error(`No existe un usuario con el ID: ${ id } en la Base de Datos`);
  }
};

module.exports = {
  isRoleValidate,
  emailExist,
  existUserById
};
