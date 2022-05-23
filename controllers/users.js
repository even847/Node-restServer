const { response, request } = require('express');



const usersGet = (req = request, res = response) => {
  const {q, nombre = "No Name", apikey, page = 1, limit} = req.query;
  res.json({
    msg: 'get API - Controlador',
    q,
    nombre,
    apikey,
    page,
    limit
  });
};

const usersPost = (req, res = response) => {
  const {nombre, edad} = req.body;

  res.status(201).json({
    msg: 'post API - Controller',
    nombre,
    edad
  });
};

const usersPut = (req, res = response) => {

  const { id } = req.params;

  res.status(400).json({
    msg: 'put API - Controller',
    id
  });
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - Controller'
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    msg: 'delete API - Controller'
  });
};




module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete
};