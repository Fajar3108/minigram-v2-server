const { ResponseHelper } = require("../helpers");
const { Post } = require("../models");

const Index = async (req, res, next) => {
    try {
        const posts = await Post.find();
        posts.sort((a, b) => b.created_at > a.created_at ? 1 : -1 );
        res.json(ResponseHelper.success({
            status: 200,
            message: 'Get All Posts',
            data: posts,
        }));
    } catch(error) {
        next(error);
    }
};

module.exports = {
    Index,
};