const router = require("express").Router();
const ImageController = require('../controllers/imageController');
const fileUploader = require('../config/cloudinary.config');

router.post("/upload", fileUploader.single("file"), ImageController.upload);

module.exports = router;