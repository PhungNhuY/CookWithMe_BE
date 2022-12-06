const router = require("express").Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:id", postController.getPost);
router.get("/", postController.getListPost);
router.post("/", authMiddleware.isAuth, postController.createPost);
router.put("/:id", authMiddleware.isAuth, postController.updatePost);
router.delete("/:id", authMiddleware.isAuth, postController.deletePost);

module.exports = router;