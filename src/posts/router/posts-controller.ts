import {Request, Response} from "express";
import {getQueryData} from "../../common/custom-methods/query-data";
import {HTTP_STATUSES} from "../../common/constants/http-statuses";
import {PostsQueryRepository} from "../posts-query/posts-query-repository";
import {BlogViewType} from "../../common/types/blog-type";
import {PostCreateType, PostUpdateType, PostViewType} from "../../common/types/post-type";
import {ObjectId} from "mongodb";
import {PostsService} from "../domain/posts-service";
import {BlogsQueryRepository} from "../../blogs/blogs-query/blogs-query-repository";
import {CommentsService} from "../../comments/service/comments-service";
import {CommentQueryRepository} from "../../comments/query-repository/comment-query-repository";
import {injectable} from "inversify";
import {BlogModel, PostModel} from "../../db";
import {jwtService, usersQueryRepository} from "../../common/composition-root/composition-root";

@injectable()
export class PostsController {
    constructor(protected postsQueryRepository: PostsQueryRepository,
                protected postsService: PostsService,
                protected blogsQueryRepository: BlogsQueryRepository,
                protected commentsService: CommentsService,
                protected commentQueryRepository: CommentQueryRepository) {
    }

    async createCommentByPostId(req: Request, res: Response) {
        const commentContent: string = req.body.content
        const postId: string = req.params.postId
        const commentId = await this.commentsService.createComment(commentContent, postId)
        if (!commentId) {
            res.sendStatus(404)
        } else {
            const comment = await this.commentQueryRepository.getCommentById(commentId)
            delete comment.postId
            res.status(201).send(comment)
        }
    }

    async getCommentByPostId(req: Request, res: Response) {
        let {sortBy, sortDirection, pageNumber, pageSize} = getQueryData(req)

        const postId: string = req.params.postId

        try {
            const comment = await this.commentQueryRepository.getCommentsByPostId(postId, sortBy, sortDirection, pageNumber, pageSize, req.headers.authorization)
            res.status(200).send(comment)

        } catch (e) {
            res.send(HTTP_STATUSES.SERVER_ERROR_500)
        }
    }

    async getPosts(req: Request, res: Response) {
        try {
            let {sortBy, sortDirection, pageNumber, pageSize} = getQueryData(req)
            const posts = await this.postsQueryRepository.getPosts(sortBy, sortDirection, pageNumber, pageSize)
            res.status(HTTP_STATUSES.OK_200).send(posts)
        } catch (error) {
            console.error('Ошибка при получении данных из коллекции:', error);
            res.status(HTTP_STATUSES.SERVER_ERROR_500)
        }
    }

    async getPostById(req: Request, res: Response) {
        debugger

        try {
            const post = await this.postsQueryRepository.getPostById(new ObjectId(req.params.id), req.headers.authorization)
            if (!post) {
                res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
                return
            }

            res.status(HTTP_STATUSES.OK_200).send(post)

        } catch (error) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
    }

    async createPost(req: Request, res: Response) {
        const getBlog: BlogViewType | boolean = await this.blogsQueryRepository.getBlogById(req.body.blogId)
        if (getBlog) {
            let newPost: PostCreateType = {
                title: req.body.title,
                shortDescription: req.body.shortDescription,
                content: req.body.content,
                blogId: req.body.blogId,
                blogName: getBlog.name,
                extendedLikesInfo: {
                    likesCount: 0,
                    dislikesCount: 0,
                    myStatus: "None",
                    newestLikes: [],
                    usersLikeStatuses: []
                },
                createdAt: new Date().toISOString()
            }
            try {
                const postId = await this.postsService.createPost(newPost)
                if (postId) {
                    const createdPost: PostViewType | boolean = await this.postsQueryRepository.getPostById(postId, req.headers.authorization)
                    res.status(HTTP_STATUSES.CREATED_201).send(createdPost)
                    return

                }
                res.sendStatus(HTTP_STATUSES.SERVER_ERROR_500)
                return
            } catch (error) {
                res.sendStatus(HTTP_STATUSES.SERVER_ERROR_500)
            }
        }


    }

    async updatePostLikeStatus(req: Request, res: Response) {
        try {


            const response: boolean = await this.postsService.updatePostLikeStatus(new ObjectId(req.params.postId), req.body.likeStatus)
            let post = await this.postsQueryRepository.getPostById(new ObjectId(req.params.postId), req.headers.authorization)
            // res.send(post)
            res.sendStatus(reesponse ? HTTP_STATUSES.NO_CONTENT_204 : HTTP_STATUSES.NOT_FOUND_404)

        } catch (error) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
    }

    async updatePost(req: Request, res: Response) {
        let postDataToUpdate: PostUpdateType = {
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            blogId: req.body.blogId
        }
        try {
            const response: boolean = await this.postsService.updatePost(new ObjectId(req.params.id), postDataToUpdate)
            res.sendStatus(response ? HTTP_STATUSES.NO_CONTENT_204 : HTTP_STATUSES.NOT_FOUND_404)

        } catch (error) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
    }

    async deletePost(req: Request, res: Response) {
        try {
            const response: boolean = await this.postsService.deletePost(new ObjectId(req.params.id))
            res.sendStatus(response ? HTTP_STATUSES.NO_CONTENT_204 : HTTP_STATUSES.NOT_FOUND_404)
        } catch (error) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
    }
}