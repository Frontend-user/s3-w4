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
exports.BlogsService = void 0;
const blogs_repositories_1 = require("../repository/blogs-repositories");
const blogs_classes_1 = require("../blogs-classes");
const inversify_1 = require("inversify");
let BlogsService = class BlogsService {
    constructor(blogsRepositories) {
        this.blogsRepositories = blogsRepositories;
    }
    createBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            let newBlog = new blogs_classes_1.BlogClass(blog.name, blog.description, blog.websiteUrl);
            const newBlogId = yield this.blogsRepositories.createBlog(newBlog);
            return newBlogId ? newBlogId : false;
        });
    }
    updateBlog(id, updateBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.blogsRepositories.updateBlog(id, updateBlog);
        });
    }
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.blogsRepositories.deleteBlog(id);
        });
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [blogs_repositories_1.BlogsRepositories])
], BlogsService);
//# sourceMappingURL=blogs-service.js.map