const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { isRoleValidate, emailExist, existUserById } = require("../helpers/db-validators");

const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);

router.post("/", [ 
  check('name', 'El nombre es obligatorio').not().isEmpty(), 
  check('password', 'El password es obligatorio y debe ser de más de 6 caracteres').isLength({ min: 6}), 
  // check('email', 'El correo electrónico no es válido').isEmail(), 
  check('email').custom( emailExist ), 
  // check('role', 'No es un Role permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom( isRoleValidate ),
  validateFields
],
  usersPost);

router.put("/:id", [
  check('id', 'No es un ID Valido').isMongoId(),
  check('id').custom( existUserById ),
  check('role').custom( isRoleValidate ),
  validateFields
], usersPut);

router.patch("/", usersPatch);

router.delete("/:id", [
  check('id', 'No es un ID Valido').isMongoId(),
  check('id').custom( existUserById ),
  validateFields
], usersDelete);

module.exports = router;
