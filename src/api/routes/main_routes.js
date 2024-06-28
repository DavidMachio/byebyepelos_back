const userRouter = require("./user_routes");

const mainRouter = require("express").Router();

mainRouter.use("/users", userRouter)

module.exports = mainRouter