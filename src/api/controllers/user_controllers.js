const { hashPassword } = require("../../config/hashPassword");
const { sendEmail } = require("../../config/nodemailer");
const { generateSign } = require("../../utils/jwt");
const User = require("../models/user_model")
const bcrypt = require('bcrypt')

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
        const user = await User.find({name: {$regex: req.params.name, $options: "i"}})
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json('No se ha encontrado este usuario')
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
        const { email, password} = req.body
        const user = await User.findOne({email})
        if( !user) return res.status(400).json('Usuario o contraseña incorrectos')

            if(bcrypt.compareSync(password, user.password)){
                const token = generateSign(user._id)
                return res.status(200).json({token, user})
            }else{
                return res.status(400).json('Usuario o contraseña incorrectos')
            }
    } catch (error) {
        return res.status(400).json('Usuario o contraseña incorrectos')
    }
}
const updateUser = async (req, res, next) => {
    try {
        const {id} = req.params

       const newUser = new User(req.body)
       const oldUser = await User.findById(id)

       newUser._id = id
        newUser.rol = 'user'
        oldUser.playList = [...oldUser.playList, ...newUser.playList]

        const user = await User.findByIdAndUpdate(id, newUser, {new:true})
        return res.status(200).json({message:'Usuario actualizado correctamente', user})
    } catch (error) {
        return res.status(400).json('Error al actualizar el usuario')
    }
}
const deleteUser = async (req, res, next) => {
    try {
        const {id} = req.params
        const userDeleted = await User.findByIdAndDelete(id)
        return res.status(200).json({message:'Usuario eliminado correctamente', userDeleted})
        
    } catch (error) {
        return res.status(400).json('Error al eliminar el usuario')
    }
}

module.exports = {
    login,
    register,
    getUser,
    updateUser,
    deleteUser,
    getUsers,

}