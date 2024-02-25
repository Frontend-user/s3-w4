import {body, param, validationResult} from "express-validator";
import {ObjectId} from "mongodb";
import {PostViewType} from "../../common/types/post-type";
import {CommentEntity} from "../types/comment-type";
import {NextFunction, Request, Response} from "express";
import {ErrorType} from "../../common/types/error-type";
import {currentUser} from "../../application/current-user";
import {commentQueryRepository, postsQueryRepository} from "../../common/composition-root/composition-root";

export const commentContentValidation = body('content').trim().isLength({min: 20, max: 300}).withMessage({
    message: 'content is wrong',
    field: 'content'
})
export const commentLikeStatusValidation = body('likeStatus')
    .trim()
    .custom((value) => {
    let correctValues = ["Like", "None", "Dislike"]
    if (!correctValues.find(i=>i===value)){
       throw new Error('likeStatus is wrong')
    }else {
        return true
    }
})
    .withMessage({
    message: 'likeStatus is wrong',
    field: 'likeStatus'
})
export const commentIdExistValidation = param('commentId').custom(async (value, {req}) => {
    const isExistCommentId: CommentEntity | boolean = await commentQueryRepository.getCommentById(new ObjectId(value))
    if (isExistCommentId) {
        return true
    } else {
        throw new Error('Wrong commentId');
    }
}).withMessage({
    message: 'Wrong commentId',
    field: 'commentId'
})
export const IdExistValidation = param('id').custom(async (value, {req}) => {
    const isExistId: CommentEntity | boolean = await commentQueryRepository.getCommentById(new ObjectId(value))

    if (isExistId) {
        return true
    } else {
        throw new Error('Wrong id');
    }
}).withMessage({
    message: 'Wrong id',
    field: 'id'
})
export const commentPostIdExistValidation = param('postId').custom(async (value, {req}) => {
    const isExistPostId: PostViewType | boolean = await postsQueryRepository.getPostById(value)
    if (isExistPostId) {
        return true
    } else {
        throw new Error('Wrong postId');
    }
}).withMessage({
    message: 'Wrong postId',
    field: 'postId'
})
export const haveAccesForUpdate = param('commentId').custom(async (value, {req}) => {
    const comment: any | boolean = await commentQueryRepository.getCommentById(new ObjectId(value))
    if (currentUser.userLogin === comment.commentatorInfo.userLogin && currentUser.userId === comment.commentatorInfo.userId) {
        return true
    } else {
        throw new Error('No access');
    }
}).withMessage({
    message: 'No access',
    field: 'No access'
})
export const commentInputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({onlyFirstError: true})
    if (errors.length) {
        let errorsForClient: ErrorType[] = []
        for (const error of errors) {
            errorsForClient.push(error.msg)
            if (error.msg.field === 'commentId' || error.msg.field === 'postId') {
                res.sendStatus(404)
                return;
            }
            if (error.msg.field === 'No access') {
                res.sendStatus(403)
                return;
            }
        }

        res.status(400).json({errorsMessages: errorsForClient})
        return
    } else {
        next()
    }
}

export const commentDeleteInputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({onlyFirstError: true})
    if (errors.length) {
        let errorsForClient: ErrorType[] = []
        for (const error of errors) {
            errorsForClient.push(error.msg)
            if (error.msg.field === 'commentId' || error.msg.field === 'postId') {
                res.sendStatus(404)
                return;
            }
            if (error.msg.field === 'No access') {
                res.sendStatus(403)
                return;
            }
        }

        res.sendStatus(404)
        return
    } else {
        next()
    }
}