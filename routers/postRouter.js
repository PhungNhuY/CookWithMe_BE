const router = require("express").Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/search", postController.searchByName);
router.get("/:id", postController.getPost);
router.get("/user/:id", postController.getPostByUser);
router.get("/", postController.getListPost);
router.post("/", authMiddleware.isAuth, postController.createPost);
router.put("/:id", authMiddleware.isAuth, postController.updatePost);
router.delete("/:id", authMiddleware.isAuth, postController.deletePost);

module.exports = router;