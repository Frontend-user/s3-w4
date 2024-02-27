import {PostEntityType, PostViewType} from "../../common/types/post-type";
import {CommentModel, PostModel} from "../../db";
import {ObjectId} from "mongodb";
import {blogsSorting} from "../../blogs/blogs-query/utils/blogs-sorting";
import {blogsPaginate} from "../../blogs/blogs-query/utils/blogs-paginate";
import {Pagination} from "../../common/types/pagination";
import {changeIdFormat} from "../../common/custom-methods/change-id-format";
import {injectable} from "inversify";
import {LIKE_STATUSES} from "../../common/constants/http-statuses";
import {JwtService} from "../../application/jwt-service";
import {newestLikes} from "../../schemas/schemas";
import {currentUser} from "../../application/current-user";

@injectable()
export class PostsQueryRepository {
    constructor(protected jwtService: JwtService) {
    }

    async getPosts(sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number): Promise<Pagination<PostViewType[]>> {
        const sortQuery = blogsSorting.getSorting(sortBy, sortDirection)
        const {skip, limit, newPageNumber, newPageSize} = blogsPaginate.getPagination(pageNumber, pageSize)


        let posts: PostEntityType[] = await PostModel.find({}).sort(sortQuery).skip(skip).limit(limit).lean()
        const allPosts = await PostModel.find({}).sort(sortQuery).lean()
        let pagesCount = Math.ceil(allPosts.length / newPageSize)
        // const fixArrayIds = posts.map((item => changeIdFormat(item, true)))

        let fixArrayIds: any[] = []
        for (let i = 0; i < posts.length; i++) {
            let post = await this.getPostById(posts[i]._id)
            fixArrayIds.push(post)
        }

        fixArrayIds = posts.map((item => changeIdFormat(item, true)))
        fixArrayIds.forEach((post:any)=>{
            let a = post.extendedLikesInfo.newestLikes.find((_:any) => _.userId === currentUser.userId)
            if(a){
                post.extendedLikesInfo.myStatus = LIKE_STATUSES.LIKE
            }
        })
        return {
            "pagesCount": pagesCount,
            "page": newPageNumber,
            "pageSize": newPageSize,
            "totalCount": allPosts.length,
            "items": fixArrayIds
        }
    }

    async getPostsByBlogId(blogId?: string, sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number): Promise<Pagination<PostViewType[]>> {
        const sortQuery = blogsSorting.getSorting(sortBy, sortDirection)
        const {skip, limit, newPageNumber, newPageSize} = blogsPaginate.getPagination(pageNumber, pageSize)
debugger
        let posts: PostEntityType[] = await PostModel.find({"blogId": blogId}).sort(sortQuery).skip(skip).limit(limit).lean()
        const allPosts = await PostModel.find({"blogId": blogId}).lean()
        let pagesCount = Math.ceil(allPosts.length / newPageSize)


        let fixArrayIds: any[] = []
        for (let i = 0; i < posts.length; i++) {
            let post = await this.getPostById(posts[i]._id)
            fixArrayIds.push(post)
        }

        fixArrayIds = posts.map((item => changeIdFormat(item, true)))
        fixArrayIds.forEach((post:any)=>{
            let a = post.extendedLikesInfo.newestLikes.find((_:any) => _.userId === currentUser.userId)
            if(a){
                post.extendedLikesInfo.myStatus = LIKE_STATUSES.LIKE
            }
        })
        return {
            "pagesCount": pagesCount,
            "page": newPageNumber,
            "pageSize": newPageSize,
            "totalCount": allPosts.length,
            "items": fixArrayIds
        }
    }

    async getPostById(postId: ObjectId | undefined | string, auth?: string | undefined, getPost?: any): Promise<PostViewType | boolean> {
        let post: any
        if (!getPost && postId) {
            post = await PostModel.findOne({_id: postId}).lean()

        } else {
            post = getPost
        }
        let accessUserId: undefined | string
        if (auth) {
            accessUserId = await this.jwtService.checkToken(auth.split(' ')[1])
        }
        if (accessUserId) {
            let usersLikeStatuses: any[] | undefined = post!.extendedLikesInfo.usersLikeStatuses
            if (usersLikeStatuses && usersLikeStatuses.length > 0) {
                let info = usersLikeStatuses.find(o => o.userId === accessUserId)
                if (info) {
                    post!.extendedLikesInfo.myStatus = info.likeStatus
                } else {
                    post!.extendedLikesInfo.myStatus = LIKE_STATUSES.NONE
                }
            }
        } else {
            post!.extendedLikesInfo.myStatus = LIKE_STATUSES.NONE

        }
        let allLikeStatuses = post.extendedLikesInfo.usersLikeStatuses
        let newestLikes = post.extendedLikesInfo.newestLikes
        allLikeStatuses.forEach((item: any) => {
            if (item.likeStatus === LIKE_STATUSES.LIKE) {
                delete item.likeStatus
                newestLikes.push(item)
            }
        })
        post.extendedLikesInfo.newestLikes = newestLikes.sort((a: any, b: any) => {
            const addedAtA = a.addedAt.toUpperCase();
            const addedAtB = b.addedAt.toUpperCase();
            if (addedAtA < addedAtB) {
                return 1;
            }
            if (addedAtA > addedAtB) {
                return -1;
            }
            return 0;
        }).slice(0, 3)
        return post ? changeIdFormat(post) : false

        // const post: PostEntityType | null = await PostModel.findOne({_id: new ObjectId(id)}).lean()
        // return post ?  changeIdFormat(post) : false
    }
}
