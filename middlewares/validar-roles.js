const { request, response } = require("express");

const esAdminRole = (req = request, res = response, next) => {

  if (!req.user) {
    return res.status(500).json({
      msg: "Se requiere verificar el role sin validar el token primero"
    });
  }

  const { role, name } = req.user;
  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg:`${name} No es administrador - No puede hacer esto`
    });
  }




  next();

};


const tieneRole = ( ...roles ) => {
  return ( req = request, res = response, next) => {
    if ( !req.user ) {
      return res.status(500).json({
        msg: "Se requiere verificar el role sin validar el token primero"
      });
    }

    if ( !roles.includes( req.user.role )) {
      return res.status(401).json({
        msg: `El usuario requiere uno de estos roles ${ roles }`
      });
    }

    next();
  };
};


module.exports = {
  esAdminRole,
  tieneRole
};