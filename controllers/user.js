const User = require('../models/user');
//we are taking v4 and giving alias uuidv4
const {v4: uuidv4} = require('uuid');
const { setUser } = require('../service/auth');

async function handleUserSignUp(req, res) {
    const {name, email, password} = req.body;
    await User.create({
        name, email, password
    });
    return res.redirect('/');
}

async function handleUserLogin(req, res) {
    const { email, password} = req.body;
    const userFound = await User.findOne({email, password});
    if(!userFound)  return res.render('login', {
        err: 'Invalid email or password!',
    });
    const token = setUser(userFound);
    // the first argument will be the name for the cookie
    res.cookie("uid", token);
    return res.redirect('/');
}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}