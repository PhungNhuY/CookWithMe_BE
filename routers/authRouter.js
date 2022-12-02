const router = require("express").Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post('/logout', authController.logout);
router.post('/fogotpassword', authController.fogotPassword);
router.post('/checkotp', authController.checkOtp);
router.post("/resendOtp", authController.resendOtp);
router.get("/getMe", authMiddleware.isAuth, authController.getMe);

module.exports = router;