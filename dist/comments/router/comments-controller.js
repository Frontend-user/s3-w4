"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsController = void 0;
const mongodb_1 = require("mongodb");
const http_statuses_1 = require("../../common/constants/http-statuses");
const comments_service_1 = require("../service/comments-service");
const comment_query_repository_1 = require("../query-repository/comment-query-repository");
const inversify_1 = require("inversify");
let CommentsController = class CommentsController {
    constructor(commentsService, commentQueryRepository) {
        this.commentsService = commentsService;
        this.commentQueryRepository = commentQueryRepository;
    }
    updateComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.commentsService.updateComment(new mongodb_1.ObjectId(req.params.commentId), req.body.content);
                res.sendStatus(response ? http_statuses_1.HTTP_STATUSES.NO_CONTENT_204 : http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
            }
            catch (error) {
                res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
            }
        });
    }
    updateCommentLikeStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.commentsService.updateCommentLikeStatus(new mongodb_1.ObjectId(req.params.commentId), req.body.likeStatus);
                let comment = yield this.commentQueryRepository.getCommentById(new mongodb_1.ObjectId(req.params.commentId), req.headers.authorization);
                // res.send(comment)
                res.sendStatus(response ? http_statuses_1.HTTP_STATUSES.NO_CONTENT_204 : http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
            }
            catch (error) {
                res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
            }
        });
    }
    deleteCommentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.commentsService.deleteComment(new mongodb_1.ObjectId(req.params.commentId));
                res.sendStatus(response ? http_statuses_1.HTTP_STATUSES.NO_CONTENT_204 : http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
            }
            catch (error) {
                res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
            }
        });
    }
    getCommentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.commentQueryRepository.getCommentById(new mongodb_1.ObjectId(req.params.id), req.headers.authorization);
            return comment ? res.send(comment) : res.sendStatus(404);
        });
    }
};
exports.CommentsController = CommentsController;
exports.CommentsController = CommentsController = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [comments_service_1.CommentsService, comment_query_repository_1.CommentQueryRepository])
], CommentsController);
//# sourceMappingURL=comments-controller.js.map