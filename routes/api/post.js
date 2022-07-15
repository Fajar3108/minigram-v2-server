const { PostController } = require('../../controllers');

const PostRouter = require('express').Router();

PostRouter.get('/', PostController.Index);
PostRouter.post('/', PostController.Store);
PostRouter.delete('/:id', PostController.Destroy);

module.exports = PostRouter;