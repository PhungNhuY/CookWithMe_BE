const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", categoryController.getCategory);
router.post("/", authMiddleware.isAuth, categoryController.createCategory);
router.put("/", authMiddleware.isAuth, categoryController.updateCategory);
router.delete("/", categoryController.deleteCategory);

module.exports = router;