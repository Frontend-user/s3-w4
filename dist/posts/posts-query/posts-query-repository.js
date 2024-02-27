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
exports.PostsQueryRepository = void 0;
const db_1 = require("../../db");
const blogs_sorting_1 = require("../../blogs/blogs-query/utils/blogs-sorting");
const blogs_paginate_1 = require("../../blogs/blogs-query/utils/blogs-paginate");
const change_id_format_1 = require("../../common/custom-methods/change-id-format");
const inversify_1 = require("inversify");
const http_statuses_1 = require("../../common/constants/http-statuses");
const jwt_service_1 = require("../../application/jwt-service");
let PostsQueryRepository = class PostsQueryRepository {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    getPosts(sortBy, sortDirection, pageNumber, pageSize, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const sortQuery = blogs_sorting_1.blogsSorting.getSorting(sortBy, sortDirection);
            const { skip, limit, newPageNumber, newPageSize } = blogs_paginate_1.blogsPaginate.getPagination(pageNumber, pageSize);
            let posts = yield db_1.PostModel.find({}).sort(sortQuery).skip(skip).limit(limit).lean();
            const allPosts = yield db_1.PostModel.find({}).sort(sortQuery).lean();
            let pagesCount = Math.ceil(allPosts.length / newPageSize);
            // const fixArrayIds = posts.map((item => changeIdFormat(item, true)))
            let fixArrayIds = [];
            for (let i = 0; i < posts.length; i++) {
                let post = yield this.getPostById(posts[i]._id, auth);
                fixArrayIds.push(post);
            }
            // fixArrayIds = posts.map((item => changeIdFormat(item, true)))
            // fixArrayIds.forEach((post:any)=>{
            //     let a = post.extendedLikesInfo.newestLikes.find((_:any) => _.userId === currentUser.userId)
            //     if(a){
            //         post.extendedLikesInfo.myStatus = LIKE_STATUSES.LIKE
            //     }
            // })
            return {
                "pagesCount": pagesCount,
                "page": newPageNumber,
                "pageSize": newPageSize,
                "totalCount": allPosts.length,
                "items": fixArrayIds
            };
        });
    }
    getPostsByBlogId(blogId, sortBy, sortDirection, pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const sortQuery = blogs_sorting_1.blogsSorting.getSorting(sortBy, sortDirection);
            const { skip, limit, newPageNumber, newPageSize } = blogs_paginate_1.blogsPaginate.getPagination(pageNumber, pageSize);
            debugger;
            let posts = yield db_1.PostModel.find({ "blogId": blogId }).sort(sortQuery).skip(skip).limit(limit).lean();
            const allPosts = yield db_1.PostModel.find({ "blogId": blogId }).lean();
            let pagesCount = Math.ceil(allPosts.length / newPageSize);
            let fixArrayIds = [];
            for (let i = 0; i < posts.length; i++) {
                let post = yield this.getPostById(posts[i]._id);
                fixArrayIds.push(post);
            }
            // fixArrayIds = posts.map((item => changeIdFormat(item, true)))
            // fixArrayIds.forEach((post:any)=>{
            //     let a = post.extendedLikesInfo.newestLikes.find((_:any) => _.userId === currentUser.userId)
            //     if(a){
            //         post.extendedLikesInfo.myStatus = LIKE_STATUSES.LIKE
            //     }
            // })
            return {
                "pagesCount": pagesCount,
                "page": newPageNumber,
                "pageSize": newPageSize,
                "totalCount": allPosts.length,
                "items": fixArrayIds
            };
        });
    }
    getPostById(postId, auth, getPost) {
        return __awaiter(this, void 0, void 0, function* () {
            let post;
            if (!getPost && postId) {
                post = yield db_1.PostModel.findOne({ _id: postId }).lean();
            }
            else {
                post = getPost;
            }
            let accessUserId;
            if (auth) {
                accessUserId = yield this.jwtService.checkToken(auth.split(' ')[1]);
            }
            if (accessUserId) {
                let usersLikeStatuses = post.extendedLikesInfo.usersLikeStatuses;
                if (usersLikeStatuses && usersLikeStatuses.length > 0) {
                    let info = usersLikeStatuses.find(o => o.userId === accessUserId);
                    if (info) {
                        post.extendedLikesInfo.myStatus = info.likeStatus;
                    }
                    else {
                        post.extendedLikesInfo.myStatus = http_statuses_1.LIKE_STATUSES.NONE;
                    }
                }
            }
            else {
                post.extendedLikesInfo.myStatus = http_statuses_1.LIKE_STATUSES.NONE;
            }
            let allLikeStatuses = post.extendedLikesInfo.usersLikeStatuses;
            let newestLikes = post.extendedLikesInfo.newestLikes;
            allLikeStatuses.forEach((item) => {
                if (item.likeStatus === http_statuses_1.LIKE_STATUSES.LIKE) {
                    delete item.likeStatus;
                    newestLikes.push(item);
                }
            });
            post.extendedLikesInfo.newestLikes = newestLikes.sort((a, b) => {
                const addedAtA = a.addedAt.toUpperCase();
                const addedAtB = b.addedAt.toUpperCase();
                if (addedAtA < addedAtB) {
                    return 1;
                }
                if (addedAtA > addedAtB) {
                    return -1;
                }
                return 0;
            }).slice(0, 3);
            return post ? (0, change_id_format_1.changeIdFormat)(post) : false;
            // const post: PostEntityType | null = await PostModel.findOne({_id: new ObjectId(id)}).lean()
            // return post ?  changeIdFormat(post) : false
        });
    }
};
exports.PostsQueryRepository = PostsQueryRepository;
exports.PostsQueryRepository = PostsQueryRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtService])
], PostsQueryRepository);
//# sourceMappingURL=posts-query-repository.js.map