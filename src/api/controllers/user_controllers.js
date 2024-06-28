const { hashPassword } = require("../../config/hashPassword");
const { sendEmail } = require("../../config/nodemailer");
const User = require("../models/user_model")

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        return res.status(200).json(users)
        
    } catch (error) {
        return res.status(400).json('Error al encontrar usuarios')
    }
}
const getUser = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

const register = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        newUser.rol = 'user'
        const userDuplicated = await User.findOne({email: req.body.email});
        if(userDuplicated) return res.status(400).json('Este email ya esta registrado')
        newUser.password = hashPassword(req.body.password)
        const user = await newUser.save()

        sendEmail({email: newUser.email, password: req.body.password})
        return res.status(201).json(user)
        
    } catch (error) {
        return res.status(400).json('Error en el registro de usuario')
    }
}


const login = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}
const updateUser = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}
const deleteUser = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    login,
    register,
    getUser,
    getUser,
    updateUser,
    deleteUser,
    getUsers,

}