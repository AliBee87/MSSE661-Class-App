const User = require('../model/User');
const bcrypt = require('bcrypt'); //install bcrypt to hash and salt incoming passwords for secure storage in db

const handleNewUser = async (req, res) => {  //define handler for new user information that we'll receive at register route
    console.log('Register New User');
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and Password are required.' }); 

    //check for duplicate usernames in database
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); //409: conflict
    
    try{
        //encrypt password with bcrypt
        const hashedPwd = await bcrypt.hash(pwd, 10); //hash and salt. 10 salt rounds is default
       
        //create and store new user
        const result = await User.create({ 
            "username": user, 
            "password": hashedPwd 
        });

        console.log(result);
       
        res.status(201).json({ 'success': `New user ${user} created!`});
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser }; 