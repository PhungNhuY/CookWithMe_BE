const router = require("express").Router();
const recommendController = require("../controllers/recommendController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", recommendController.getRecommend);
module.exports = router;