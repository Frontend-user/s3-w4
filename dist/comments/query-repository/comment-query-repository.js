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
exports.CommentQueryRepository = void 0;
const db_1 = require("../../db");
const blogs_sorting_1 = require("../../blogs/blogs-query/utils/blogs-sorting");
const blogs_paginate_1 = require("../../blogs/blogs-query/utils/blogs-paginate");
const http_statuses_1 = require("../../common/constants/http-statuses");
const jwt_service_1 = require("../../application/jwt-service");
const inversify_1 = require("inversify");
let CommentQueryRepository = class CommentQueryRepository {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    getCommentsByPostId(postId, sortBy, sortDirection, pageNumber, pageSize, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const sortQuery = blogs_sorting_1.blogsSorting.getSorting(sortBy, sortDirection);
            const { skip, limit, newPageNumber, newPageSize } = blogs_paginate_1.blogsPaginate.getPagination(pageNumber, pageSize);
            const comments = yield db_1.CommentModel.find({ postId: postId }).sort(sortQuery).skip(skip).limit(limit).lean();
            const allComments = yield db_1.CommentModel.find({ postId: postId }).sort(sortQuery).lean();
            let pagesCount = Math.ceil(allComments.length / newPageSize);
            let getRightLikeStatuses = [];
            for (let i = 0; i < comments.length; i++) {
                let s = yield this.getCommentById(undefined, auth, comments[i]);
                getRightLikeStatuses.push(s);
            }
            return {
                "pagesCount": pagesCount,
                "page": newPageNumber,
                "pageSize": newPageSize,
                "totalCount": allComments.length,
                "items": getRightLikeStatuses
            };
        });
    }
    getCommentById(commentId, auth, getComment) {
        return __awaiter(this, void 0, void 0, function* () {
            let comment;
            if (!getComment && commentId) {
                comment = yield db_1.CommentModel.findOne({ _id: commentId }).lean();
            }
            else {
                comment = getComment;
            }
            let accessUserId;
            if (auth) {
                accessUserId = yield this.jwtService.checkToken(auth.split(' ')[1]);
            }
            if (accessUserId) {
                let usersLikeStatuses = comment.likesInfo.usersLikeStatuses;
                if (usersLikeStatuses && usersLikeStatuses.length > 0) {
                    let info = usersLikeStatuses.find(o => o.userId === accessUserId);
                    if (info) {
                        comment.likesInfo.myStatus = info.likeStatus;
                    }
                    else {
                        comment.likesInfo.myStatus = http_statuses_1.LIKE_STATUSES.NONE;
                    }
                }
            }
            else {
                comment.likesInfo.myStatus = http_statuses_1.LIKE_STATUSES.NONE;
            }
            return comment ? this.changeCommentFormat(comment) : false;
        });
    }
    changeCommentFormat(obj) {
        obj.id = obj._id;
        delete obj._id;
        delete obj.likesInfo.usersLikeStatuses;
        delete obj.__v;
        delete obj.postId;
        return obj;
    }
};
exports.CommentQueryRepository = CommentQueryRepository;
exports.CommentQueryRepository = CommentQueryRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtService])
], CommentQueryRepository);
//# sourceMappingURL=comment-query-repository.js.map