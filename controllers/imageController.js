const { codeEnum } = require("../enums/status-code.enum");
const { statusEnum } = require("../enums/status.enum");
const { msgEnum } = require('../enums/message.enum');

class ImageController {
    upload(req, res, next) {
        console.log("---Image/upload");
        if (!req.file) {
            return res.status(codeEnum.BAD_REQUEST).json({
                status: statusEnum.FAIL,
                message: msgEnum.NO_FILE_UPLOADED,
            });
        }

        // res.json({ secure_url: req.file.path });
        return res.status(codeEnum.CREATED).json({
            status: statusEnum.SUCCESS,
            data: req.file.path,
        });
    }
}

module.exports = new ImageController();