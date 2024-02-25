"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsController = exports.blogsRouter = exports.blogsPostBindValidators = void 0;
const blogs_validation_1 = require("../../validation/blogs-validation");
const auth_validation_1 = require("../../validation/auth-validation");
const express_1 = require("express");
const blogs_posts_bind_validation_1 = require("../../validation/blogs-posts-bind-validation");
const posts_validation_1 = require("../../validation/posts-validation");
const composition_root_1 = require("../../common/composition-root/composition-root");
const blogs_controller_1 = require("./blogs-controller");
exports.blogsPostBindValidators = [
    auth_validation_1.authorizationMiddleware,
    posts_validation_1.postTitleValidation,
    posts_validation_1.postDescValidation,
    posts_validation_1.postContentValidation,
    blogs_posts_bind_validation_1.postBlogBindIdExistValidation,
    blogs_posts_bind_validation_1.blogsPostsBindingInputValidationMiddleware
];
const blogValidators = [
    auth_validation_1.bearerAndAdminAuthMiddleware,
    blogs_validation_1.blogDescValidation,
    blogs_validation_1.blogNameValidation,
    blogs_validation_1.blogWebUrlValidation,
    blogs_validation_1.blogWebUrlValidation2,
    blogs_validation_1.inputValidationMiddleware,
];
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsController = composition_root_1.container.resolve(blogs_controller_1.BlogsControllerConstructor);
exports.blogsRouter.get('/', exports.blogsController.getBlogs.bind(exports.blogsController));
exports.blogsRouter.get('/:id', blogs_validation_1.blogIdValidation, exports.blogsController.getBlogById.bind(exports.blogsController));
exports.blogsRouter.post('/', ...blogValidators, exports.blogsController.createBlog.bind(exports.blogsController));
exports.blogsRouter.put('/:id', ...blogValidators, exports.blogsController.updateBlog.bind(exports.blogsController));
exports.blogsRouter.delete('/:id', auth_validation_1.authorizationMiddleware, blogs_validation_1.blogIdValidation, exports.blogsController.deleteBlog.bind(exports.blogsController));
exports.blogsRouter.get('/:blogId/posts', blogs_posts_bind_validation_1.postBlogBindIdExistValidation, blogs_posts_bind_validation_1.blogsPostsBindingInputValidationMiddleware, exports.blogsController.getPostByBlogId.bind(exports.blogsController));
exports.blogsRouter.post('/:blogId/posts', ...exports.blogsPostBindValidators, exports.blogsController.createPostInBlogs.bind(exports.blogsController));
//# sourceMappingURL=blogs-router.js.map