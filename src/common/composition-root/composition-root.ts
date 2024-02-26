import "reflect-metadata"
import {BlogsRepositories} from "../../blogs/repository/blogs-repositories";
import {BlogsService} from "../../blogs/domain/blogs-service";
import {BlogsControllerConstructor} from "../../blogs/router/blogs-controller";
import {BlogsQueryRepository} from "../../blogs/blogs-query/blogs-query-repository";
import {PostsRepositories} from "../../posts/repositories/posts-repositories";
import {PostsQueryRepository} from "../../posts/posts-query/posts-query-repository";
import {PostsService} from "../../posts/domain/posts-service";
import {PostsController} from "../../posts/router/posts-controller";
import {CommentsRepository} from "../../comments/repository/comments-repository";
import {CommentQueryRepository} from "../../comments/query-repository/comment-query-repository";
import {CommentsService} from "../../comments/service/comments-service";
import {CommentsController} from "../../comments/router/comments-controller";
import {AuthController} from "../../auth/auth-router/auth-controller";
import {AuthService} from "../../auth/auth-domain/auth-service";
import {UsersQueryRepository} from "../../users/query-repository/users-query-repository";
import {JwtService} from "../../application/jwt-service";
import {QuerySecurityRepositories} from "../../security/query-repository/query-security-repository";
import {SecurityRepositories} from "../../security/repositories/security-repository";
import {AuthRepositories} from "../../auth/auth-repository/auth-repository";
import {SecurityService} from "../../security/domain/security-service";
import {UsersRepositories} from "../../users/repository/users-repository";
import {NodemailerService} from "../../application/nodemailer-service";
import {UsersController} from "../../users/router/users-controller";
import {UsersService} from "../../users/domain/users-service";
import {SecurityDevicesController} from "../../security/router/security-controller";
import {Container} from "inversify";

export const TYPES = {
    UsersService: Symbol.for("UsersService"),
    Weapon: Symbol.for("Weapon"),
    ThrowableWeapon: Symbol.for("ThrowableWeapon")
};

export const container = new Container();
container.bind<PostsQueryRepository>(PostsQueryRepository).to(PostsQueryRepository);
container.bind<BlogsRepositories>(BlogsRepositories).to(BlogsRepositories);
container.bind<BlogsQueryRepository>(BlogsQueryRepository).to(BlogsQueryRepository);
container.bind<BlogsService>(BlogsService).to(BlogsService);
container.bind<PostsRepositories>(PostsRepositories).to(PostsRepositories);
container.bind<PostsService>(PostsService).to(PostsService);
container.bind<CommentsRepository>(CommentsRepository).to(CommentsRepository);
container.bind<JwtService>(JwtService).to(JwtService);
container.bind<CommentQueryRepository>(CommentQueryRepository).to(CommentQueryRepository);
container.bind<CommentsService>(CommentsService).to(CommentsService);
container.bind<UsersRepositories>(UsersRepositories).to(UsersRepositories);
container.bind<QuerySecurityRepositories>(QuerySecurityRepositories).to(QuerySecurityRepositories);
container.bind<SecurityRepositories>(SecurityRepositories).to(SecurityRepositories);
container.bind<NodemailerService>(NodemailerService).to(NodemailerService);
container.bind<AuthRepositories>(AuthRepositories).to(AuthRepositories);
container.bind<SecurityService>(SecurityService).to(SecurityService);
container.bind<AuthService>(AuthService).to(AuthService);
container.bind<UsersQueryRepository>(UsersQueryRepository).to(UsersQueryRepository);


container.bind<UsersService>(UsersService).to(UsersService);



container.bind<UsersController>(UsersController).to(UsersController);
container.bind<BlogsControllerConstructor>(BlogsControllerConstructor).to(BlogsControllerConstructor);
container.bind<PostsController>(PostsController).to(PostsController);
container.bind<AuthController>(AuthController).to(AuthController);
container.bind<CommentsController>(CommentsController).to(CommentsController);
container.bind<SecurityDevicesController>(SecurityDevicesController).to(SecurityDevicesController);

export const jwtService = container.resolve(JwtService)
export const authRepositories = container.resolve(AuthRepositories)
export const postsQueryRepository = container.resolve(PostsQueryRepository)
export const commentQueryRepository = container.resolve(CommentQueryRepository)
export const usersQueryRepository = container.resolve(UsersQueryRepository)
export const blogsQueryRepository = container.resolve(BlogsQueryRepository)

