import {Router} from "express";
import {
    authorizationMiddleware,
    bearerAndAdminAuthMiddleware,
    bearerAuthMiddleware, logUserByTokenMiddleware
} from "../../validation/auth-validation";
import {
    postBlogIdExistValidation,
    postBlogIdValidation,
    postContentValidation,
    postDescValidation, postIdExistValidation,
    postIdValidation,
    postTitleValidation
} from "../../validation/posts-validation";
import {inputValidationMiddleware} from "../../validation/blogs-validation";
import {
    commentContentValidation, commentInputValidationMiddleware,
    commentPostIdExistValidation, likeStatusValidation
} from "../../comments/validation/comments-validation";
import {PostsController} from "./posts-controller";
import {container} from "../../common/composition-root/composition-root";
export const postsController = container.resolve(PostsController)

export const postValidators = [
    bearerAndAdminAuthMiddleware,
    postTitleValidation,
    postDescValidation,
    postContentValidation,
    postBlogIdValidation,
    postBlogIdExistValidation,
    inputValidationMiddleware
]

export const postsRouter = Router({})


postsRouter.post('/:postId/comments',
    bearerAuthMiddleware,
    commentPostIdExistValidation,
    commentContentValidation,
    commentInputValidationMiddleware, postsController.createCommentByPostId.bind(postsController))

postsRouter.get('/:postId/comments',
    commentPostIdExistValidation,
    commentInputValidationMiddleware,
    postsController.getCommentByPostId.bind(postsController))

postsRouter.get('/', postsController.getPosts.bind(postsController))


postsRouter.get('/:id',logUserByTokenMiddleware, postIdValidation, postsController.getPostById.bind(postsController))

postsRouter.post('/',
    ...postValidators,
    postsController.createPost.bind(postsController))

postsRouter.put('/:id', ...postValidators, postsController.updatePost.bind(postsController))

postsRouter.put('/:postId/like-status',
    bearerAuthMiddleware,
    likeStatusValidation,
    postIdExistValidation,
    commentInputValidationMiddleware,
    postsController.updatePostLikeStatus.bind(postsController))

postsRouter.delete('/:id',
    authorizationMiddleware,
    postIdValidation, postsController.deletePost.bind(postsController))
