const PostModel = require('../models/postModel');
const { msgEnum } = require('../enums/message.enum');
const { statusEnum } = require('../enums/status.enum');
const { codeEnum } = require('../enums/status-code.enum');

class PostController {

    // GET
    async getPost(req, res, next){
        try {
            const { postID } = req.params;
            let post = await PostModel.findById(postID).populate("author");

            res.status(codeEnum.SUCCESS).json({
                status: statusEnum.SUCCESS,
                data: post
            })
        } catch (error) {
            next(error);
        }
    }

    // POST
    async createPost(req, res, next){
        try {
            const {author, title, image_cover, steps, ingredients, video_link, categories} = req.body
            await PostModel.create({author, title, image_cover, steps, ingredients, video_link, categories})
            res.status(codeEnum.CREATED).json({
                status: statusEnum.SUCCESS,
                message: msgEnum.CREATE_POST_SUCCESS
            })
        } catch (error) {
            next(error);
        }
    }

    // PUT
    async updatePost(req, res, next){
        try {
            const { postID } = req.params;
            const {author, title, image_cover, steps, ingredients, video_link, categories} = req.body;
            
            let post = await PostModel.findById(postID);
            console.log(post);
            if(!post){
                return res.status(codeEnum.BAD_REQUEST).json({
                    status: statusEnum.FAIL,
                    message: msgEnum.POST_NOT_EXIST
                });
            }

            await PostModel.findByIdAndUpdate(postID, {author, title, image_cover, steps, ingredients, video_link, categories})
            res.status(codeEnum.SUCCESS).json({
                status: statusEnum.SUCCESS,
                message: msgEnum.UPDATE_POST_SUCCESS
            })
        } catch (error) {
            next(error);
        }
    }

    // DELETE
    async deletePost(req, res, next){
        try {
            const { postID } = req.params;
            await PostModel.findByIdAndDelete(postID);

            res.status(codeEnum.SUCCESS).json({
                success: statusEnum.SUCCESS,
                message: msgEnum.deletePost
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PostController();