const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post('/logout', authController.logout);
router.post('/fogotpassword', authController.fogotPassword);
router.post('/checkotp', authController.checkOtp);
router.post("/resendOtp", authController.resendOtp);

module.exports = router;