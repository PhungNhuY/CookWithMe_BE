const router = require("express").Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:postID", authMiddleware.isAuth, postController.getPost);
router.post("/", authMiddleware.isAuth, postController.createPost);
router.put("/:postID", authMiddleware.isAuth, postController.updatePost);
router.delete("/:postID", authMiddleware.isAuth, postController.deletePost);

module.exports = router;