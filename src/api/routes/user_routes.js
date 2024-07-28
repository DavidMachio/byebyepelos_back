const { isAuth, isAdmin } = require('../../middlewares/auth');
const {checkUser} = require('../../middlewares/checkUser');
const { register, getUsers, getUser, login, updateUser, deleteUser } = require('../controllers/user_controllers');

const userRouter = require('express').Router();
//routes

userRouter.post("/register", register)
userRouter.post('/login', login)
userRouter.put('/:id', isAuth, checkUser, updateUser)
userRouter.delete('/:id', isAdmin, deleteUser)
userRouter.get("/", getUsers)
userRouter.get("/:name", getUser)



module.exports = userRouter;