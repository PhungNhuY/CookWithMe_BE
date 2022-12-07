const { codeEnum } = require('../enums/status-code.enum');
const { msgEnum } = require("../enums/message.enum");
const SessionModel = require("../models/sessionModel");

async function isAuth(req, res, next) {
    console.log("--- authMiddleware.isAuth ---");
    //get token from header
    const tokenFromClient = req.headers["token"];
    if (!tokenFromClient) {
        return res.status(codeEnum.FORBIDDEN).json({
            status: false,
            message: msgEnum.MISSING_TOKEN,
        });
    } else {
        try {
            const session = await SessionModel.findById(tokenFromClient);
            if (session && session.exp >= new Date(new Date().getTime())) {
                req.user_id = session.user_id;
                next();
            } else {
                return res.status(codeEnum.UNAUTHORIZED).json({
                    status: false,
                    message: msgEnum.TOKEN_EXPIRED,
                });
            }
        } catch (error) {
            return res.status(codeEnum.UNAUTHORIZED).json({
                status: false,
                message: msgEnum.INVALID_TOKEN,
            });
        }
    }
}

module.exports = { isAuth };