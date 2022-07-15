const { PostController } = require('../../controllers');

const PostRouter = require('express').Router();

PostRouter.get('/', PostController.Index);

module.exports = PostRouter;