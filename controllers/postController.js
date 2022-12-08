const PostModel = require('../models/postModel');
const { msgEnum } = require('../enums/message.enum');
const { statusEnum } = require('../enums/status.enum');
const { codeEnum } = require('../enums/status-code.enum');
const postModel = require('../models/postModel');

class PostController {

    // GET
    async getPost(req, res, next){
        console.log("---PostController.getPost");
        try {
            const { postID } = req.params;
            let post = await PostModel.findById(postID).populate("author");

            if (!post) {
                return res.status(codeEnum.NOT_FOUND).json({
                    status: statusEnum.FAIL,
                    message: msgEnum.NOT_FOUND,
                });
            }

            res.status(codeEnum.SUCCESS).json({
                status: statusEnum.SUCCESS,
                data: post
            })
        } catch (error) {
            next(error);
        }
    }

    // GET
    async getListPost(req, res, next) {
        console.log("---PostController.getListPost");
        try {
            let query = PostModel.find();

            // pagination
            const page = req.query.page || 1;
            const limit = req.query.perpage || 100;
            const skip = (page - 1) * limit;
            query = query.skip(skip).limit(limit);

            // fields
            if (req.query.fields) {
                const fields = req.query.fields.split(",").join(" ");
                query = query.select(fields);
            }

            //sort
            if (req.query.sort) {
                const sortBy = req.query.sort.split(",").join(" ");
                query = query.sort(sortBy);
            } else {
                // query = query.sort("-createdAt");
                query = query.sort("name");
            }

            const listPost = await query;

            // count
            const count = await PostModel.count();
            const pages = Math.ceil(count / limit);

            return res.status(codeEnum.SUCCESS).json({
                status: statusEnum.SUCCESS,
                pages,
                data: listPost,
            });
        } catch (error) {
            next(error);
        }
    }

    // POST
    async createPost(req, res, next){
        console.log("---PostController.createPost");
        try {
            const {title, image_cover, steps, ingredients, video_link, categories} = req.body
            const author = req.user_id;
            const post = await PostModel.create({author, title, image_cover, steps, ingredients, video_link, categories})
            res.status(codeEnum.CREATED).json({
                status: statusEnum.SUCCESS,
                data: post,
            })
        } catch (error) {
            next(error);
        }
    }

    // PUT
    async updatePost(req, res, next){
        console.log("---PostController.updatePost");
        try {
            let post = await PostModel.findOne({
                _id: req.params.id,
                author: req.user_id,
            });

            if (!post) {
                return res.status(codeEnum.NOT_FOUND).json({
                    status: statusEnum.FAIL,
                    message: msgEnum.NOT_FOUND,
                });
            }

            post = await PostModel.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            })

            return res.status(codeEnum.SUCCESS).json({
                status: statusEnum.SUCCESS,
                data: post,
            });
        } catch (error) {
            next(error);
        }
    }

    // DELETE
    async deletePost(req, res, next){
        console.log("---PostController.deletePost");
        try {
            const post = await PostModel.findOne({
                _id: req.params.id,
                author: req.user_id,
            });

            if (!post) {
                return res.status(codeEnum.NOT_FOUND).json({
                    status: statusEnum.FAIL,
                    message: msgEnum.NOT_FOUND,
                });
            }

            await PostModel.findOneAndDelete(post);
            return res.status(codeEnum.NO_CONTENT).json({
                status: statusEnum.SUCCESS,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PostController();