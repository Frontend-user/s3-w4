import { Router} from "express";
import {
    usersEmailValidation,
    usersLoginValidation,
    usersPasswordValidation,

} from "../validation/users-validation";
import {blogIdValidation, inputValidationMiddleware} from "../../validation/blogs-validation";

import {authorizationMiddleware} from "../../validation/auth-validation";
import {container} from "../../common/composition-root/composition-root";
import {UsersController} from "./users-controller";

export const usersValidators = [
    authorizationMiddleware,
    usersLoginValidation,
    usersPasswordValidation,
    usersEmailValidation,
    inputValidationMiddleware,
]
export const usersRouter = Router({})
const usersController = container.resolve(UsersController)

usersRouter.get('/',
    authorizationMiddleware,
    usersController.getUsers.bind(usersController) )


usersRouter.post('/',
    ...usersValidators,
    usersController.createUser.bind(usersController) )


usersRouter.delete('/:id',
    authorizationMiddleware,
    blogIdValidation,
    usersController.deleteUser.bind(usersController) )

