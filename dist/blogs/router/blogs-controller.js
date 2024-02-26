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
exports.BlogsControllerConstructor = exports.blogs = void 0;
const http_statuses_1 = require("../../common/constants/http-statuses");
const mongodb_1 = require("mongodb");
const blogs_service_1 = require("../domain/blogs-service");
const query_data_1 = require("../../common/custom-methods/query-data");
const posts_service_1 = require("../../posts/domain/posts-service");
const blogs_query_repository_1 = require("../blogs-query/blogs-query-repository");
const posts_query_repository_1 = require("../../posts/posts-query/posts-query-repository");
const inversify_1 = require("inversify");
exports.blogs = [];
let BlogsControllerConstructor = class BlogsControllerConstructor {
    constructor(blogsService, blogsQueryRepository, postsQueryRepository, postsService) {
        this.blogsService = blogsService;
        this.blogsQueryRepository = blogsQueryRepository;
        this.postsQueryRepository = postsQueryRepository;
        this.postsService = postsService;
    }
    getBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { sortBy, sortDirection, pageNumber, pageSize } = (0, query_data_1.getQueryData)(req);
                let searchNameTerm = req.query.searchNameTerm ? String(req.query.searchNameTerm) : undefined;
                const blogs = yield this.blogsQueryRepository.getBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize);
                res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(blogs);
            }
            catch (error) {
                console.error('Ошибка при получении данных из коллекции:', error);
                res.sendStatus(http_statuses_1.HTTP_STATUSES.SERVER_ERROR_500);
            }
        });
    }
    getBlogById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogsQueryRepository.getBlogById(req.params.id);
            if (!blog) {
                res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
                return;
            }
            res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(blog);
        });
    }
    createBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newBlog = {
                    name: req.body.name,
                    description: req.body.description,
                    websiteUrl: req.body.websiteUrl,
                };
                const response = yield this.blogsService.createBlog(newBlog);
                if (response) {
                    const createdBlog = yield this.blogsQueryRepository.getBlogById(String(response));
                    res.status(http_statuses_1.HTTP_STATUSES.CREATED_201).send(createdBlog);
                    return;
                }
            }
            catch (error) {
                res.sendStatus(http_statuses_1.HTTP_STATUSES.SERVER_ERROR_500);
            }
        });
    }
    updateBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogDataToUpdate = {
                name: req.body.name,
                description: req.body.description,
                websiteUrl: req.body.websiteUrl,
            };
            try {
                const response = yield this.blogsService.updateBlog(new mongodb_1.ObjectId(req.params.id), blogDataToUpdate);
                res.sendStatus(response ? http_statuses_1.HTTP_STATUSES.NO_CONTENT_204 : http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
            }
            catch (error) {
                res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
            }
        });
    }
    deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.blogsService.deleteBlog(new mongodb_1.ObjectId(req.params.id));
                res.sendStatus(response ? http_statuses_1.HTTP_STATUSES.NO_CONTENT_204 : http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
            }
            catch (error) {
                res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
            }
        });
    }
    getPostByBlogId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { sortBy, sortDirection, pageNumber, pageSize } = (0, query_data_1.getQueryData)(req);
            try {
                const posts = yield this.postsQueryRepository.getPostsByBlogId(String(req.params.blogId), sortBy, sortDirection, pageNumber, pageSize);
                res.send(posts);
            }
            catch (error) {
                console.error('Ошибка при получении данных из коллекции:', error);
                res.sendStatus(http_statuses_1.HTTP_STATUSES.SERVER_ERROR_500);
            }
        });
    }
    createPostInBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let getBlogName;
            const getBlog = yield this.blogsQueryRepository.getBlogById(req.params.blogId);
            if (getBlog) {
                getBlogName = getBlog.name;
                let newPost = {
                    title: req.body.title,
                    shortDescription: req.body.shortDescription,
                    content: req.body.content,
                    blogId: req.params.blogId,
                    blogName: getBlogName,
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
                    const response = yield this.postsService.createPost(newPost);
                    const createdPost = yield this.postsQueryRepository.getPostById(String(response));
                    if (!createdPost) {
                        res.sendStatus(http_statuses_1.HTTP_STATUSES.SERVER_ERROR_500);
                        return;
                    }
                    res.status(http_statuses_1.HTTP_STATUSES.CREATED_201).send(createdPost);
                }
                catch (error) {
                    res.sendStatus(http_statuses_1.HTTP_STATUSES.SERVER_ERROR_500);
                }
            }
        });
    }
};
exports.BlogsControllerConstructor = BlogsControllerConstructor;
exports.BlogsControllerConstructor = BlogsControllerConstructor = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService,
        blogs_query_repository_1.BlogsQueryRepository,
        posts_query_repository_1.PostsQueryRepository,
        posts_service_1.PostsService])
], BlogsControllerConstructor);
//# sourceMappingURL=blogs-controller.js.map