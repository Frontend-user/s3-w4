"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.PostsRepositories = void 0;
const db_1 = require("../../db");
const inversify_1 = require("inversify");
const current_user_1 = require("../../application/current-user");
const http_statuses_1 = require("../../common/constants/http-statuses");
let PostsRepositories = class PostsRepositories {
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield db_1.PostModel.create(post);
            return response ? response._id : false;
        });
    }
    updatePost(id, updatePost) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield db_1.PostModel.updateOne({ _id: id }, updatePost);
            return response.matchedCount === 1;
        });
    }
    updatePostLikeStatus(id, likeStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('repo');
            debugger;
            console.log(current_user_1.currentUser, 'CURRENT');
            const userIdLikeStatus = {
                userId: current_user_1.currentUser.userId,
                likeStatus: likeStatus,
                addedAt: new Date().toISOString(),
                login: current_user_1.currentUser.userLogin
            };
            const newestLike = {
                addedAt: new Date().toISOString(),
                userId: current_user_1.currentUser.userId,
                login: current_user_1.currentUser.login
            };
            const post = yield db_1.PostModel.findOne({ _id: id });
            let postLikeStatusesArray = post.extendedLikesInfo.usersLikeStatuses;
            let findObject = postLikeStatusesArray.find(o => o.userId === current_user_1.currentUser.userId);
            if (!findObject && likeStatus !== http_statuses_1.LIKE_STATUSES.NONE) {
                if (likeStatus === http_statuses_1.LIKE_STATUSES.LIKE) {
                    let currentLikes = post.extendedLikesInfo.likesCount;
                    currentLikes++;
                    post.extendedLikesInfo.likesCount = currentLikes;
                }
                else {
                    let currentDislikes = post.extendedLikesInfo.dislikesCount;
                    currentDislikes++;
                    post.extendedLikesInfo.dislikesCount = currentDislikes;
                }
                post.extendedLikesInfo.myStatus = likeStatus;
                post.extendedLikesInfo.usersLikeStatuses.push(userIdLikeStatus);
                post.markModified('extendedLikesInfo');
                yield post.save();
            }
            if (likeStatus !== http_statuses_1.LIKE_STATUSES.NONE && findObject && findObject.likeStatus !== likeStatus) {
                const getPost = yield db_1.PostModel.findOne({ _id: id });
                let dislikes = getPost.extendedLikesInfo.dislikesCount;
                let likes = getPost.extendedLikesInfo.likesCount;
                if (likeStatus === http_statuses_1.LIKE_STATUSES.DISLIKE) {
                    dislikes++;
                    likes--;
                }
                else {
                    likes++;
                    dislikes--;
                }
                yield db_1.PostModel.updateOne({ _id: id, 'extendedLikesInfo.usersLikeStatuses.userId': current_user_1.currentUser.userId }, {
                    '$set': {
                        'extendedLikesInfo.myStatus': likeStatus,
                        'extendedLikesInfo.likesCount': likes,
                        'extendedLikesInfo.dislikesCount': dislikes,
                        'extendedLikesInfo.usersLikeStatuses.$.likeStatus': likeStatus
                    }
                });
                const updatedPost = yield db_1.PostModel.findOne({ _id: id });
                console.log(updatedPost.extendedLikesInfo.usersLikeStatuses, 'gggggggggggggggggggggggggggg');
            }
            if (likeStatus === http_statuses_1.LIKE_STATUSES.NONE && findObject && likeStatus !== post.extendedLikesInfo.myStatus) {
                console.log(post.extendedLikesInfo, 'BEFORE LIKEINO');
                const getPost = yield db_1.PostModel.findOne({ _id: id });
                let dislikes = getPost.extendedLikesInfo.dislikesCount;
                let likes = getPost.extendedLikesInfo.likesCount;
                let pastLikeStatus = getPost.extendedLikesInfo.myStatus;
                if (pastLikeStatus === http_statuses_1.LIKE_STATUSES.DISLIKE) {
                    dislikes--;
                }
                else {
                    likes--;
                }
                yield db_1.PostModel.updateOne({ _id: id }, {
                    '$set': {
                        'extendedLikesInfo.myStatus': http_statuses_1.LIKE_STATUSES.NONE,
                        'extendedLikesInfo.likesCount': likes,
                        'extendedLikesInfo.dislikesCount': dislikes,
                    },
                    $pull: { 'extendedLikesInfo.usersLikeStatuses': { userId: current_user_1.currentUser.userId } }
                });
            }
            return true;
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield db_1.PostModel.deleteOne({ _id: id });
            return !!response.deletedCount;
        });
    }
};
exports.PostsRepositories = PostsRepositories;
exports.PostsRepositories = PostsRepositories = __decorate([
    (0, inversify_1.injectable)()
], PostsRepositories);
//# sourceMappingURL=posts-repositories.js.map