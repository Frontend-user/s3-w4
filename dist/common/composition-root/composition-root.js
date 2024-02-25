"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsQueryRepository = exports.usersQueryRepository = exports.commentQueryRepository = exports.postsQueryRepository = exports.authRepositories = exports.jwtService = exports.container = void 0;
require("reflect-metadata");
const blogs_repositories_1 = require("../../blogs/repository/blogs-repositories");
const blogs_service_1 = require("../../blogs/domain/blogs-service");
const blogs_controller_1 = require("../../blogs/router/blogs-controller");
const blogs_query_repository_1 = require("../../blogs/blogs-query/blogs-query-repository");
const posts_repositories_1 = require("../../posts/repositories/posts-repositories");
const posts_query_repository_1 = require("../../posts/posts-query/posts-query-repository");
const posts_service_1 = require("../../posts/domain/posts-service");
const posts_controller_1 = require("../../posts/router/posts-controller");
const comments_repository_1 = require("../../comments/repository/comments-repository");
const comment_query_repository_1 = require("../../comments/query-repository/comment-query-repository");
const comments_service_1 = require("../../comments/service/comments-service");
const comments_controller_1 = require("../../comments/router/comments-controller");
const auth_controller_1 = require("../../auth/auth-router/auth-controller");
const auth_service_1 = require("../../auth/auth-domain/auth-service");
const users_query_repository_1 = require("../../users/query-repository/users-query-repository");
const jwt_service_1 = require("../../application/jwt-service");
const query_security_repository_1 = require("../../security/query-repository/query-security-repository");
const security_repository_1 = require("../../security/repositories/security-repository");
const auth_repository_1 = require("../../auth/auth-repository/auth-repository");
const security_service_1 = require("../../security/domain/security-service");
const users_repository_1 = require("../../users/repository/users-repository");
const nodemailer_service_1 = require("../../application/nodemailer-service");
const users_controller_1 = require("../../users/router/users-controller");
const users_service_1 = require("../../users/domain/users-service");
const security_controller_1 = require("../../security/router/security-controller");
const inversify_1 = require("inversify");
// export const postsQueryRepository = new PostsQueryRepository()
// export const blogsRepositories = new BlogsRepositories()
// export const blogsQueryRepository = new BlogsQueryRepository()
// export const blogsService = new BlogsService(blogsRepositories)
// export const postsRepositories = new PostsRepositories()
// export const postsService = new PostsService(postsRepositories)
// export const commentsRepository = new CommentsRepository()
// export const usersQueryRepository = new UsersQueryRepository()
// export const jwtService = new JwtService(usersQueryRepository)
// export const commentQueryRepository = new CommentQueryRepository(jwtService)
// export const commentsService = new CommentsService(commentsRepository)
// export const postsController = new PostsController(postsQueryRepository, postsService, blogsQueryRepository,commentsService, commentQueryRepository)
// export const blogsController = new BlogsControllerConstructor(blogsService, blogsQueryRepository, postsQueryRepository, postsService)
// export const commentsController = new CommentsController(commentsService, commentQueryRepository)
// // constructor(protected authService:AuthService){}
// export const usersRepositories = new UsersRepositories()
// export const querySecurityRepositories = new QuerySecurityRepositories(jwtService)
// export const securityRepositories = new SecurityRepositories(jwtService)
// export const nodemailerService = new NodemailerService()
// export const authRepositories = new AuthRepositories(nodemailerService)
// export const securityService = new SecurityService(securityRepositories)
// export const authService = new AuthService(authRepositories,jwtService,usersRepositories, nodemailerService)
//
// export const authController = new AuthController(authService, usersQueryRepository,
//     jwtService,querySecurityRepositories, securityRepositories,authRepositories,
//     securityService)
// export const usersService = new UsersService(jwtService, usersRepositories)
// export const usersController = new UsersController(usersService, usersQueryRepository)
// export const securityDevicesController =
//     new SecurityDevicesController(securityRepositories, querySecurityRepositories,jwtService)
exports.container = new inversify_1.Container();
exports.container.bind(posts_query_repository_1.PostsQueryRepository).to(posts_query_repository_1.PostsQueryRepository);
exports.container.bind(blogs_repositories_1.BlogsRepositories).to(blogs_repositories_1.BlogsRepositories);
exports.container.bind(blogs_query_repository_1.BlogsQueryRepository).to(blogs_query_repository_1.BlogsQueryRepository);
exports.container.bind(blogs_service_1.BlogsService).to(blogs_service_1.BlogsService);
exports.container.bind(posts_repositories_1.PostsRepositories).to(posts_repositories_1.PostsRepositories);
exports.container.bind(posts_service_1.PostsService).to(posts_service_1.PostsService);
exports.container.bind(comments_repository_1.CommentsRepository).to(comments_repository_1.CommentsRepository);
exports.container.bind(jwt_service_1.JwtService).to(jwt_service_1.JwtService);
exports.container.bind(comment_query_repository_1.CommentQueryRepository).to(comment_query_repository_1.CommentQueryRepository);
exports.container.bind(comments_service_1.CommentsService).to(comments_service_1.CommentsService);
exports.container.bind(users_repository_1.UsersRepositories).to(users_repository_1.UsersRepositories);
exports.container.bind(query_security_repository_1.QuerySecurityRepositories).to(query_security_repository_1.QuerySecurityRepositories);
exports.container.bind(security_repository_1.SecurityRepositories).to(security_repository_1.SecurityRepositories);
exports.container.bind(nodemailer_service_1.NodemailerService).to(nodemailer_service_1.NodemailerService);
exports.container.bind(auth_repository_1.AuthRepositories).to(auth_repository_1.AuthRepositories);
exports.container.bind(security_service_1.SecurityService).to(security_service_1.SecurityService);
exports.container.bind(auth_service_1.AuthService).to(auth_service_1.AuthService);
exports.container.bind(users_service_1.UsersService).to(users_service_1.UsersService);
exports.container.bind(users_query_repository_1.UsersQueryRepository).to(users_query_repository_1.UsersQueryRepository);
exports.container.bind(users_controller_1.UsersController).to(users_controller_1.UsersController);
exports.container.bind(blogs_controller_1.BlogsControllerConstructor).to(blogs_controller_1.BlogsControllerConstructor);
exports.container.bind(posts_controller_1.PostsController).to(posts_controller_1.PostsController);
exports.container.bind(auth_controller_1.AuthController).to(auth_controller_1.AuthController);
exports.container.bind(comments_controller_1.CommentsController).to(comments_controller_1.CommentsController);
exports.container.bind(security_controller_1.SecurityDevicesController).to(security_controller_1.SecurityDevicesController);
exports.jwtService = exports.container.resolve(jwt_service_1.JwtService);
exports.authRepositories = exports.container.resolve(auth_repository_1.AuthRepositories);
exports.postsQueryRepository = exports.container.resolve(posts_query_repository_1.PostsQueryRepository);
exports.commentQueryRepository = exports.container.resolve(comment_query_repository_1.CommentQueryRepository);
exports.usersQueryRepository = exports.container.resolve(users_query_repository_1.UsersQueryRepository);
exports.blogsQueryRepository = exports.container.resolve(blogs_query_repository_1.BlogsQueryRepository);
//# sourceMappingURL=composition-root.js.map