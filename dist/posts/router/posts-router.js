"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = exports.postValidators = exports.postsController = void 0;
const express_1 = require("express");
const auth_validation_1 = require("../../validation/auth-validation");
const posts_validation_1 = require("../../validation/posts-validation");
const blogs_validation_1 = require("../../validation/blogs-validation");
const comments_validation_1 = require("../../comments/validation/comments-validation");
const posts_controller_1 = require("./posts-controller");
const composition_root_1 = require("../../common/composition-root/composition-root");
exports.postsController = composition_root_1.container.resolve(posts_controller_1.PostsController);
exports.postValidators = [
    auth_validation_1.bearerAndAdminAuthMiddleware,
    posts_validation_1.postTitleValidation,
    posts_validation_1.postDescValidation,
    posts_validation_1.postContentValidation,
    posts_validation_1.postBlogIdValidation,
    posts_validation_1.postBlogIdExistValidation,
    blogs_validation_1.inputValidationMiddleware
];
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.post('/:postId/comments', auth_validation_1.bearerAuthMiddleware, comments_validation_1.commentPostIdExistValidation, comments_validation_1.commentContentValidation, comments_validation_1.commentInputValidationMiddleware, exports.postsController.createCommentByPostId.bind(exports.postsController));
exports.postsRouter.get('/:postId/comments', comments_validation_1.commentPostIdExistValidation, comments_validation_1.commentInputValidationMiddleware, exports.postsController.getCommentByPostId.bind(exports.postsController));
exports.postsRouter.get('/', exports.postsController.getPosts.bind(exports.postsController));
exports.postsRouter.get('/:id', auth_validation_1.logUserByTokenMiddleware, posts_validation_1.postIdValidation, exports.postsController.getPostById.bind(exports.postsController));
exports.postsRouter.post('/', ...exports.postValidators, exports.postsController.createPost.bind(exports.postsController));
exports.postsRouter.put('/:id', ...exports.postValidators, exports.postsController.updatePost.bind(exports.postsController));
exports.postsRouter.put('/:postId/like-status', auth_validation_1.bearerAuthMiddleware, comments_validation_1.likeStatusValidation, posts_validation_1.postIdExistValidation, comments_validation_1.commentInputValidationMiddleware, exports.postsController.updatePostLikeStatus.bind(exports.postsController));
exports.postsRouter.delete('/:id', auth_validation_1.authorizationMiddleware, posts_validation_1.postIdValidation, exports.postsController.deletePost.bind(exports.postsController));
//# sourceMappingURL=posts-router.js.map