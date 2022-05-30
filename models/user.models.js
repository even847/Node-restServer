const { Schema, model} = require('mongoose');


const UsersSchema = Schema({
  name: {
    type: String,
    require: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    require: [true, 'El correo es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    require: [true, 'La contraseña es obligatorio'],
  },
  img: {
    type: String
  },
  role: {
    type: String,
    require: true,
    emun: ['ADMIN_ROLE', 'USER_ROLE']
  },
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

UsersSchema.methods.toJSON = function() {
  const { __v, password, ...user } = this.toObject();
  return user;
};


module.exports = model( 'User', UsersSchema );