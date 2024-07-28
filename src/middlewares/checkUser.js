const checkUser = (req, res, next) => {
    if(req.user.rol !== 'admin' && req.user._id.toString() !== req.params.id){
        return res.status(400).json('No puedes realizar esta acción')
    }else{
        next();
    }
}
module.exports = {checkUser}