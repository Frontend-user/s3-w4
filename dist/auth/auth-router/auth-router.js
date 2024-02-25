"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = exports.authController = exports.registrationValidators = void 0;
const users_validation_1 = require("../../users/validation/users-validation");
const blogs_validation_1 = require("../../validation/blogs-validation");
exports.registrationValidators = [
    users_validation_1.usersLoginValidation,
    users_validation_1.usersPasswordValidation,
    users_validation_1.usersEmailValidation,
    users_validation_1.userEmailExistValidation,
    users_validation_1.userLoginExistValidation,
    blogs_validation_1.inputValidationMiddleware,
];
const express_1 = require("express");
const tokenValidator_1 = require("../validation/tokenValidator");
const auth_controller_1 = require("./auth-controller");
const composition_root_1 = require("../../common/composition-root/composition-root");
exports.authController = composition_root_1.container.resolve(auth_controller_1.AuthController);
exports.authRouter = (0, express_1.Router)({});
exports.authRouter.get('/me', tokenValidator_1.authorizationTokenMiddleware, tokenValidator_1.tokenValidationMiddleware, exports.authController.me.bind(exports.authController));
exports.authRouter.post('/refresh-token', tokenValidator_1.refreshTokenValidator, tokenValidator_1.isUnValidTokenMiddleware, tokenValidator_1.tokenValidationMiddleware, exports.authController.refreshToken.bind(exports.authController));
exports.authRouter.post('/login', tokenValidator_1.customRestrictionValidator, exports.authController.login.bind(exports.authController));
exports.authRouter.post('/registration', tokenValidator_1.customRestrictionValidator, ...exports.registrationValidators, exports.authController.registration.bind(exports.authController));
exports.authRouter.post('/registration-confirmation', tokenValidator_1.customRestrictionValidator, users_validation_1.checkCodeConfirmation, users_validation_1.checkCodeExist, blogs_validation_1.inputValidationMiddleware, exports.authController.registrationConfirmation.bind(exports.authController));
exports.authRouter.post('/registration-email-resending', tokenValidator_1.customRestrictionValidator, users_validation_1.checkEmailConfirmation, users_validation_1.userEmailRecendingExistValidation, blogs_validation_1.inputValidationMiddleware, exports.authController.registrationEmailResending.bind(exports.authController));
exports.authRouter.post('/password-recovery', tokenValidator_1.customRestrictionValidator, users_validation_1.usersEmailValidation, users_validation_1.userEmailExistValidation, tokenValidator_1.recoveryValidationMiddleware, exports.authController.passwordRecovery.bind(exports.authController));
exports.authRouter.post('/new-password', tokenValidator_1.customRestrictionValidator, tokenValidator_1.newPasswordValidation, tokenValidator_1.recoveryValidationMiddleware, exports.authController.newPassword.bind(exports.authController));
//# sourceMappingURL=auth-router.js.map