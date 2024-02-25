"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsController = exports.commentsRouter = void 0;
const express_1 = require("express");
const auth_validation_1 = require("../../validation/auth-validation");
const comments_validation_1 = require("../validation/comments-validation");
const composition_root_1 = require("../../common/composition-root/composition-root");
const comments_controller_1 = require("./comments-controller");
exports.commentsRouter = (0, express_1.Router)({});
exports.commentsController = composition_root_1.container.resolve(comments_controller_1.CommentsController);
exports.commentsRouter.put('/:commentId', auth_validation_1.bearerAuthMiddleware, comments_validation_1.commentContentValidation, comments_validation_1.commentIdExistValidation, comments_validation_1.haveAccesForUpdate, comments_validation_1.commentInputValidationMiddleware, exports.commentsController.updateComment.bind(exports.commentsController));
exports.commentsRouter.put('/:commentId/like-status', auth_validation_1.bearerAuthMiddleware, comments_validation_1.commentLikeStatusValidation, comments_validation_1.commentIdExistValidation, comments_validation_1.commentInputValidationMiddleware, exports.commentsController.updateCommentLikeStatus.bind(exports.commentsController));
exports.commentsRouter.delete('/:commentId', auth_validation_1.bearerAuthMiddleware, comments_validation_1.commentIdExistValidation, comments_validation_1.haveAccesForUpdate, comments_validation_1.commentDeleteInputValidationMiddleware, exports.commentsController.deleteCommentById.bind(exports.commentsController));
exports.commentsRouter.get('/:id', exports.commentsController.getCommentById.bind(exports.commentsController));
//# sourceMappingURL=comments-router.js.map