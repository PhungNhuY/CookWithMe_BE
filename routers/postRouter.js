const router = require("express").Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware.isAuth, postController.getPost);
router.post("/", authMiddleware.isAuth, postController.createPost);
router.put("/", authMiddleware.isAuth, postController.updatePost);
router.delete("/", authMiddleware.isAuth, postController.deletePost);

module.exports = router;