"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = exports.usersValidators = void 0;
const express_1 = require("express");
const users_validation_1 = require("../validation/users-validation");
const blogs_validation_1 = require("../../validation/blogs-validation");
const auth_validation_1 = require("../../validation/auth-validation");
const composition_root_1 = require("../../common/composition-root/composition-root");
const users_controller_1 = require("./users-controller");
exports.usersValidators = [
    auth_validation_1.authorizationMiddleware,
    users_validation_1.usersLoginValidation,
    users_validation_1.usersPasswordValidation,
    users_validation_1.usersEmailValidation,
    blogs_validation_1.inputValidationMiddleware,
];
exports.usersRouter = (0, express_1.Router)({});
const usersController = composition_root_1.container.resolve(users_controller_1.UsersController);
exports.usersRouter.get('/', auth_validation_1.authorizationMiddleware, usersController.getUsers.bind(usersController));
exports.usersRouter.post('/', ...exports.usersValidators, usersController.createUser.bind(usersController));
exports.usersRouter.delete('/:id', auth_validation_1.authorizationMiddleware, blogs_validation_1.blogIdValidation, usersController.deleteUser.bind(usersController));
//# sourceMappingURL=users-router.js.map