const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:id", categoryController.getCategory);
router.get("/", categoryController.getListCategoy);
router.post("/", authMiddleware.isAuth, categoryController.createCategory);
router.put("/:id", authMiddleware.isAuth, categoryController.updateCategory);
router.delete("/:id", authMiddleware.isAuth, categoryController.deleteCategory);

module.exports = router;