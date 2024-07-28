
const { getMusicians, getMusician, deleteMusician, updateMusician, createMusician } = require("../controllers/musicians_controllers");
const { isAdmin, isAuth } = require("../../middlewares/auth");


const musicianRouter = require('express').Router();

musicianRouter.post('/', isAdmin, createMusician)
musicianRouter.get('/', getMusicians)
musicianRouter.get('/:name', getMusician)
musicianRouter.delete('/:id', isAdmin, deleteMusician)
musicianRouter.put('/:id', isAdmin, updateMusician)


module.exports = musicianRouter