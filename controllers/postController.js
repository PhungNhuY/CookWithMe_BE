const PostModel = require('../models/postModel');

class PostController {

    // GET
    getPost(req, res, next){
        res.send("get post");
    }

    // POST
    createPost(req, res, next){
        res.send("create post");
    }

    // PUT
    updatePost(req, res, next){
        res.send("update post");
    }

    // DELETE
    deletePost(req, res, next){
        res.send("delete post");
    }
}

module.exports = new PostController();