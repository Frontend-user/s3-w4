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
exports.PostsService = void 0;
const posts_repositories_1 = require("../repositories/posts-repositories");
const inversify_1 = require("inversify");
let PostsService = class PostsService {
    constructor(postsRepositories) {
        this.postsRepositories = postsRepositories;
    }
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPostId = yield this.postsRepositories.createPost(post);
            return newPostId ? newPostId : false;
        });
    }
    updatePost(id, updatePost) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postsRepositories.updatePost(id, updatePost);
        });
    }
    updatePostLikeStatus(id, likeStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postsRepositories.updatePostLikeStatus(id, likeStatus);
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postsRepositories.deletePost(id);
        });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [posts_repositories_1.PostsRepositories])
], PostsService);
//# sourceMappingURL=posts-service.js.map