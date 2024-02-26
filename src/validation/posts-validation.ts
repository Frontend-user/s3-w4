
import {body, param} from "express-validator";
import {BlogViewType} from "../common/types/blog-type";
import {
    blogsQueryRepository,
    commentQueryRepository,
    postsQueryRepository
} from "../common/composition-root/composition-root";
import {CommentEntity} from "../comments/types/comment-type";
import {ObjectId} from "mongodb";
import {PostViewType} from "../common/types/post-type";

export const postTitleValidation = body('title').trim().isLength({min: 4, max: 30}).withMessage({
    message: 'title is wrong',
    field: 'title'
})
export const postDescValidation = body('shortDescription').trim().isLength({min: 4, max: 100}).withMessage({
    message: 'shortDescription is wrong',
    field: 'shortDescription'
})


export const postContentValidation = body('content').trim().isLength({min: 4, max: 1000}).withMessage({
    message: 'content is wrong',
    field: 'content'
})

export const postBlogIdValidation = body('blogId').trim().isLength({min: 1, max: 300}).withMessage({
    message: 'id is wrong',
    field: 'id'
})

export const postBlogIdExistValidation = body('blogId').custom(async (value, {req}) => {
    const isExistBlogId: BlogViewType | boolean = await blogsQueryRepository.getBlogById(value)
    if (isExistBlogId) {
        return true
    } else {
        throw new Error('Wrong blogID');
    }
}).withMessage({
    message: 'Wrong blogID',
    field: 'blogId'
})

export const postIdValidation = body('id').trim().isLength({min: 1, max: 300}).isString().withMessage({
    message: 'id is wrong',
    field: 'id'
})


export const postIdExistValidation = param('postId').custom(async (value, {req}) => {
    const isExistPostId: PostViewType | boolean = await postsQueryRepository.getPostById(new ObjectId(value), req!.headers!.authorization)
    if (isExistPostId) {
        return true
    } else {
        throw new Error('Wrong postId');
    }
}).withMessage({
    message: 'Wrong postId',
    field: 'postId'
})