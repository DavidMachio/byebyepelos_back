const { register } = require('../controllers/user_controllers');

const userRouter = require('express').Router();


userRouter.post("/register", register)


module.exports = userRouter;