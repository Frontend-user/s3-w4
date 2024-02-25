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
exports.BlogsRepositories = void 0;
const db_1 = require("../../db");
const inversify_1 = require("inversify");
let BlogsRepositories = class BlogsRepositories {
    createBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield db_1.BlogModel.create(blog);
                return response ? response._id : false;
            }
            catch (e) {
                console.log(e, 'er');
                return false;
            }
        });
    }
    updateBlog(id, updateBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield db_1.BlogModel.updateOne({ _id: id }, updateBlog);
            return response.matchedCount === 1;
        });
    }
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield db_1.BlogModel.deleteOne({ _id: id });
            return !!response.deletedCount;
        });
    }
};
exports.BlogsRepositories = BlogsRepositories;
exports.BlogsRepositories = BlogsRepositories = __decorate([
    (0, inversify_1.injectable)()
], BlogsRepositories);
//# sourceMappingURL=blogs-repositories.js.map