import { param, validationResult} from "express-validator";
import {BlogViewType} from "../common/types/blog-type";
import {NextFunction, Request, Response} from "express";
import {ErrorType} from "../common/types/error-type";
import {blogsQueryRepository} from "../common/composition-root/composition-root";


export const postBlogBindIdExistValidation = param('blogId').custom(async (value, {req}) => {
    const isExistBlogId: BlogViewType | boolean = await blogsQueryRepository.getBlogById(value)

    if (isExistBlogId) {
        return true
    } else {
        throw new Error('Wrong blogId');
    }
}).withMessage({
    message: 'Wrong blogId',
    field: 'blogId'
})

export const blogsPostsBindingInputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({onlyFirstError:true})
    if (errors.length) {
        let errorsForClient:ErrorType[] = []
        for (const error of errors) {
            errorsForClient.push(error.msg)
            if(error.msg.field=== 'blogId'){
                res.sendStatus(404)
                return;
            }
        }

        res.status(400).json({errorsMessages: errorsForClient})
        return
    } else {
        next()
    }
}
