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
exports.CommentsService = void 0;
const current_user_1 = require("../../application/current-user");
const comments_repository_1 = require("../repository/comments-repository");
const inversify_1 = require("inversify");
let CommentsService = class CommentsService {
    constructor(commentsRepository) {
        this.commentsRepository = commentsRepository;
    }
    createComment(comment, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newComment = {
                content: comment,
                postId: postId,
                commentatorInfo: {
                    userId: current_user_1.currentUser.userId,
                    userLogin: current_user_1.currentUser.userLogin
                },
                likesInfo: {
                    likesCount: 0,
                    dislikesCount: 0,
                    myStatus: 'None',
                    usersLikeStatuses: []
                },
                createdAt: new Date().toISOString()
            };
            const response = yield this.commentsRepository.createComment(newComment);
            return response;
        });
    }
    updateComment(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commentsRepository.updateComment(id, { content: content });
        });
    }
    updateCommentLikeStatus(id, likeStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commentsRepository.updateCommentLikeStatus(id, likeStatus);
        });
    }
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commentsRepository.deleteCommentById(id);
        });
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [comments_repository_1.CommentsRepository])
], CommentsService);
//# sourceMappingURL=comments-service.js.map