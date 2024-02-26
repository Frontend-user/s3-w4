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
exports.PostsController = void 0;
const query_data_1 = require("../../common/custom-methods/query-data");
const http_statuses_1 = require("../../common/constants/http-statuses");
const posts_query_repository_1 = require("../posts-query/posts-query-repository");
const mongodb_1 = require("mongodb");
const posts_service_1 = require("../domain/posts-service");
const blogs_query_repository_1 = require("../../blogs/blogs-query/blogs-query-repository");
const comments_service_1 = require("../../comments/service/comments-service");
const comment_query_repository_1 = require("../../comments/query-repository/comment-query-repository");
const inversify_1 = require("inversify");
let PostsController = class PostsController {
    constructor(postsQueryRepository, postsService, blogsQueryRepository, commentsService, commentQueryRepository) {
        this.postsQueryRepository = postsQueryRepository;
        this.postsService = postsService;
        this.blogsQueryRepository = blogsQueryRepository;
        this.commentsService = commentsService;
        this.commentQueryRepository = commentQueryRepository;
    }
    createCommentByPostId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentContent = req.body.content;
            const postId = req.params.postId;
            const commentId = yield this.commentsService.createComment(commentContent, postId);
            if (!commentId) {
                res.sendStatus(404);
            }
            else {
                const comment = yield this.commentQueryRepository.getCommentById(commentId);
                delete comment.postId;
                res.status(201).send(comment);
            }
        });
    }
    getCommentByPostId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { sortBy, sortDirection, pageNumber, pageSize } = (0, query_data_1.getQueryData)(req);
            const postId = req.params.postId;
            try {
                const comment = yield this.commentQueryRepository.getCommentsByPostId(postId, sortBy, sortDirection, pageNumber, pageSize, req.headers.authorization);
                res.status(200).send(comment);
            }
            catch (e) {
                res.send(http_statuses_1.HTTP_STATUSES.SERVER_ERROR_500);
            }
        });
    }
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { sortBy, sortDirection, pageNumber, pageSize } = (0, query_data_1.getQueryData)(req);
                const posts = yield this.postsQueryRepository.getPosts(sortBy, sortDirection, pageNumber, pageSize);
                res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(posts);
            }
            catch (error) {
                console.error('Ошибка при получении данных из коллекции:', error);
                res.status(http_statuses_1.HTTP_STATUSES.SERVER_ERROR_500);
            }
        });
    }
    getPostById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            debugger;
            try {
                const post = yield this.postsQueryRepository.getPostById(new mongodb_1.ObjectId(req.params.id));
                if (!post) {
                    res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
                    return;
                }
                res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(post);
            }
            catch (error) {
                res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
            }
        });
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const getBlog = yield this.blogsQueryRepository.getBlogById(req.body.blogId);
            if (getBlog) {
                let newPost = {
                    title: req.body.title,
                    shortDescription: req.body.shortDescription,
                    content: req.body.content,
                    blogId: req.body.blogId,
                    blogName: getBlog.name,
                    extendedLikesInfo: {
                        likesCount: 0,
                        dislikesCount: 0,
                        myStatus: "None",
                        newestLikes: [],
                        usersLikeStatuses: []
                    },
                    createdAt: new Date().toISOString()
                };
                try {
                    const postId = yield this.postsService.createPost(newPost);
                    if (postId) {
                        const createdPost = yield this.postsQueryRepository.getPostById(postId, req.headers.authorization);
                        res.status(http_statuses_1.HTTP_STATUSES.CREATED_201).send(createdPost);
                        return;
                    }
                    res.sendStatus(http_statuses_1.HTTP_STATUSES.SERVER_ERROR_500);
                    return;
                }
                catch (error) {
                    res.sendStatus(http_statuses_1.HTTP_STATUSES.SERVER_ERROR_500);
                }
            }
        });
    }
    updatePostLikeStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.postsService.updatePostLikeStatus(new mongodb_1.ObjectId(req.params.postId), req.body.likeStatus);
                let post = yield this.postsQueryRepository.getPostById(new mongodb_1.ObjectId(req.params.postId), req.headers.authorization);
                // res.send(post)
                res.sendStatus(response ? http_statuses_1.HTTP_STATUSES.NO_CONTENT_204 : http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
            }
            catch (error) {
                res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
            }
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let postDataToUpdate = {
                title: req.body.title,
                shortDescription: req.body.shortDescription,
                content: req.body.content,
                blogId: req.body.blogId
            };
            try {
                const response = yield this.postsService.updatePost(new mongodb_1.ObjectId(req.params.id), postDataToUpdate);
                res.sendStatus(response ? http_statuses_1.HTTP_STATUSES.NO_CONTENT_204 : http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
            }
            catch (error) {
                res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
            }
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.postsService.deletePost(new mongodb_1.ObjectId(req.params.id));
                res.sendStatus(response ? http_statuses_1.HTTP_STATUSES.NO_CONTENT_204 : http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
            }
            catch (error) {
                res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
            }
        });
    }
};
exports.PostsController = PostsController;
exports.PostsController = PostsController = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [posts_query_repository_1.PostsQueryRepository,
        posts_service_1.PostsService,
        blogs_query_repository_1.BlogsQueryRepository,
        comments_service_1.CommentsService,
        comment_query_repository_1.CommentQueryRepository])
], PostsController);
//# sourceMappingURL=posts-controller.js.map