const router = require("express").Router();
const favoriteController = require("../controllers/favoriteController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware.isAuth, favoriteController.add);
router.post("/delete", authMiddleware.isAuth, favoriteController.delete);
router.get("/getList", authMiddleware.isAuth, favoriteController.getList);

module.exports = router;