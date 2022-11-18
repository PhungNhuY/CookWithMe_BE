const UserModel = require('../models/userModel');
const SessionModel = require('../models/sessionModel');
const { codeEnum } = require('../enums/status-code.enum');
const { msgEnum } = require('../enums/message.enum');
const { statusEnum } = require('../enums/status.enum');
const mailService = require('../utils/sendMail');
const createOTP = require('../utils/createOTP');
const { remove } = require('../models/userModel');

class AuthController {
    // POST auth/login
    login(req, res, next) {
        res.send("login");
    }

    // POST auth/register
    async register(req, res, next) {
        try {
            // check email in DB
            const emailFromClient = req.body.email;
            const user = await UserModel.findOne({ email: emailFromClient });
            if (user && user.status != "inactivated") {
                // user exsit
                return res.status(codeEnum.BAD_REQUEST).json({
                    status: statusEnum.FAIL,
                    message: msgEnum.EMAIL_EXISTED,
                });
            } else {
                // user does not exsit
                req.body.otp = createOTP();
                await UserModel.findOneAndDelete({email: emailFromClient});
                let user = await UserModel.create(req.body);

                await mailService({
                    email: user.email,
                    subject: "this is your OTP",
                    message: user.otp,
                });

                user = await UserModel.find({email: emailFromClient});
                res.status(codeEnum.CREATED).json({
                    status: statusEnum.SUCCESS,
                    data: user,
                });
            }
        } catch (error) {
            next(error);
        }
    }

    confirmOTP(req, res, next){

    }

    // POST auth/logout
    logout(req, res, next) {
        res.send("logout");
    }

    // ???
    // POST auth/fogotPassword
    fogotPassword(req, res, next) {
        res.send("fogotPassword");
    }

    // POST auth/checkOtp/{:id}
    checkOtp(req, res, next) {
        res.send("checkOtp");
    }
}

module.exports = new AuthController();