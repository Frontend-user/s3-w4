import {
    blogDescValidation,
    blogIdValidation,
    blogNameValidation,
    blogWebUrlValidation, blogWebUrlValidation2, inputValidationMiddleware
} from "../../validation/blogs-validation";
import {authorizationMiddleware, bearerAndAdminAuthMiddleware} from "../../validation/auth-validation";
import { Router} from "express";
import {
    blogsPostsBindingInputValidationMiddleware,
    postBlogBindIdExistValidation
} from "../../validation/blogs-posts-bind-validation";
import {postContentValidation, postDescValidation, postTitleValidation} from "../../validation/posts-validation";
import {container} from "../../common/composition-root/composition-root";
import {AuthController} from "../../auth/auth-router/auth-controller";
import {BlogsControllerConstructor} from "./blogs-controller";
export const blogsPostBindValidators = [
    authorizationMiddleware,
    postTitleValidation,
    postDescValidation,
    postContentValidation,
    postBlogBindIdExistValidation,
    blogsPostsBindingInputValidationMiddleware
]
const blogValidators = [
    bearerAndAdminAuthMiddleware,
    blogDescValidation,
    blogNameValidation,
    blogWebUrlValidation,
    blogWebUrlValidation2,
    inputValidationMiddleware,
]
export const blogsRouter = Router({})
export const blogsController = container.resolve(BlogsControllerConstructor)

blogsRouter.get('/', blogsController.getBlogs.bind(blogsController))
blogsRouter.get('/:id', blogIdValidation, blogsController.getBlogById.bind(blogsController))
blogsRouter.post('/', ...blogValidators, blogsController.createBlog.bind(blogsController))
blogsRouter.put('/:id', ...blogValidators, blogsController.updateBlog.bind(blogsController))
blogsRouter.delete('/:id', authorizationMiddleware, blogIdValidation, blogsController.deleteBlog.bind(blogsController))

blogsRouter.get('/:blogId/posts', postBlogBindIdExistValidation, blogsPostsBindingInputValidationMiddleware, blogsController.getPostByBlogId.bind(blogsController))

blogsRouter.post('/:blogId/posts', ...blogsPostBindValidators, blogsController.createPostInBlogs.bind(blogsController))

