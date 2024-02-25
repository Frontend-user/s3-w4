"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const test_router_1 = require("./routes/test-router");
const users_router_1 = require("./users/router/users-router");
const posts_router_1 = require("./posts/router/posts-router");
const auth_router_1 = require("./auth/auth-router/auth-router");
const comments_router_1 = require("./comments/router/comments-router");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const security_router_1 = require("./security/router/security-router");
const blogs_router_1 = require("./blogs/router/blogs-router");
exports.app = (0, express_1.default)();
const jsonBodyMiddleware = express_1.default.json();
exports.app.use(jsonBodyMiddleware);
exports.app.use((0, cookie_parser_1.default)());
exports.app.use('/blogs', blogs_router_1.blogsRouter);
exports.app.use('/posts', posts_router_1.postsRouter);
exports.app.use('/users', users_router_1.usersRouter);
exports.app.use('/comments', comments_router_1.commentsRouter);
exports.app.use('/auth', auth_router_1.authRouter);
exports.app.use('/testing', test_router_1.testRouter);
exports.app.use('/security/devices', security_router_1.securityRouter);
//# sourceMappingURL=app.js.map