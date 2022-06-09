
const validaCampos = require("../middlewares/validate-fields");
const validarJWT  = require("../middlewares/validar-jwt");
const validaRoles = require("../middlewares/validar-roles");


module.exports = {
  ...validaCampos,
  ...validarJWT,
  ...validaRoles,
}