"use strict";
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
class PostsRepositories {
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield db_1.PostModel.create(post);
            return response ? String(response._id) : false;
        });
    }
    updatePost(id, updatePost) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield db_1.PostModel.updateOne({ _id: id }, updatePost);
            return response.matchedCount === 1;
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield db_1.PostModel.deleteOne({ _id: id });
            return !!response.deletedCount;
        });
    }
}
exports.PostsRepositories = PostsRepositories;
//# sourceMappingURL=posts-repositories.js.map