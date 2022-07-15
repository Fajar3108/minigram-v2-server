const { ResponseHelper, StorageHelper } = require("../helpers");
const { Post } = require("../models");
const fs = require('fs');

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

const Store = async (req, res, next) => {
    try {
        const { title, description, type, visibility } = req.body;
        const post = new Post({
            title, description, type, visibility,
            user_id: req.user._id,
        });

        if (type === 'video' || type === 'short') {
            if (!req.files || !req.files.video.mimetype.includes('video')) next(new Error('Please put your video'));
            const filename =  StorageHelper.Store(req.files.video, 'posts');
            post.files.push(`${StorageHelper.GetUri(req)}/posts/${filename}`);
        } else if (type === 'gallery') {
            if (!req.files) next(new Error('Please put your files'));
            req.files.files.forEach(file => {
                const filename =  StorageHelper.Store(file, 'posts');
                post.files.push(`${StorageHelper.GetUri(req)}/posts/${filename}`);
            });
        } else{
            if (req.files) {
                if (!req.files.thumbnail.mimetype.includes('image')) next(new Error('Thumbnail must be an image'));
                const filename =  StorageHelper.Store(req.files.thumbnail, 'posts');
                post.files.push(`${StorageHelper.GetUri(req)}/posts/${filename}`);
            }
        }
        await post.save();
        res.json(ResponseHelper.success({
            status: 201,
            message: 'Post created successfully',
            data: post,
        }));
    } catch (error) {
        next(error);
    }
};

const Destroy = async (req, res, next) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        post.files.forEach((file) => {
            const splitter = file.split('/');
            const name = splitter[splitter.length - 1];
            fs.unlinkSync(`./public/storage/posts/${name}`);
        });
        await Post.deleteOne({ _id: req.params.id });
        res.json(ResponseHelper.success({
            status: 200,
            message: 'Post deleted successfully',
        }));
    } catch(error) {
        next(error);
    }
}

module.exports = {
    Index,
    Store,
    Destroy,
};