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
exports.BlogsQueryRepository = void 0;
const db_1 = require("../../db");
const mongodb_1 = require("mongodb");
const blogs_sorting_1 = require("./utils/blogs-sorting");
const blogs_finding_1 = require("./utils/blogs-finding");
const blogs_paginate_1 = require("./utils/blogs-paginate");
const change_id_format_1 = require("../../common/custom-methods/change-id-format");
const inversify_1 = require("inversify");
let BlogsQueryRepository = class BlogsQueryRepository {
    getBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const findQuery = blogs_finding_1.blogsFinding.getFindings(searchNameTerm);
            const sortQuery = blogs_sorting_1.blogsSorting.getSorting(sortBy, sortDirection);
            const { skip, limit, newPageNumber, newPageSize } = blogs_paginate_1.blogsPaginate.getPagination(pageNumber, pageSize);
            let blogs = yield db_1.BlogModel.find(findQuery).sort(sortQuery).skip(skip).limit(limit).lean();
            const allBlogs = yield db_1.BlogModel.find(findQuery).sort(sortQuery).lean();
            let pagesCount = Math.ceil(allBlogs.length / newPageSize);
            const fixArrayIds = blogs.map((item => (0, change_id_format_1.changeIdFormat)(item)));
            const response = {
                "pagesCount": pagesCount,
                "page": newPageNumber,
                "pageSize": newPageSize,
                "totalCount": allBlogs.length,
                "items": fixArrayIds
            };
            return response;
        });
    }
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.BlogModel.findOne({ _id: new mongodb_1.ObjectId(id) }).lean();
            return blog ? (0, change_id_format_1.changeBlogFormat)(blog) : false;
        });
    }
};
exports.BlogsQueryRepository = BlogsQueryRepository;
exports.BlogsQueryRepository = BlogsQueryRepository = __decorate([
    (0, inversify_1.injectable)()
], BlogsQueryRepository);
//# sourceMappingURL=blogs-query-repository.js.map