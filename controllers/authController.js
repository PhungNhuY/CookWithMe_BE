const UserModel = require('../models/userModel');
const SessionModel = require('../models/sessionModel');

class AuthController {
    // POST auth/login
    login(req, res, next){
        res.send("login");
    }

    // POST auth/register
    async register(req, res, next){
        // check email in DB
        const emailFromClient = req.body.email;
        const user = await UserModel.findOne({email: emailFromClient});
        if(user)
    }

    // POST auth/logout
    logout(req, res, next){
        res.send("logout");
    }

    // ???
    // POST auth/fogotPassword
    fogotPassword(req, res, next){ 
        res.send("fogotPassword");
    }

    // POST auth/checkOtp/{:id}
    checkOtp(req, res, next){
        res.send("checkOtp");
    }
}

module.exports = new AuthController();