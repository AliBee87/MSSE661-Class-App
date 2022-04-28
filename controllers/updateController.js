const User = require('../model/User');
const bcrypt = require('bcrypt'); 

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Email, Username, Password required' });

    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No user ${req.params.id}.` });
    }
    res.json(recipe);
}

const updateUser = async (req, res) => {
    console.log("Update User");
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'Email, Username, Password required' });
    }

    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!email || !user || !pwd) {
        return res.status(204).json({ "message": `No user matches ${req.body.id}.` });
    }
    if (req.body?.email) user.email = req.body.email;
    if (req.body?.username) user.username = req.body.username;
    if (req.body?.password) user.password = req.body.password;
    const result = await user.save();
    res.json(result);
}


module.exports = {
    getUser,
    updateUser
}
