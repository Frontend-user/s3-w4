import {ObjectId} from "mongodb";
import {PostCreateType, PostUpdateType } from "../../common/types/post-type";
import {PostsRepositories} from "../repositories/posts-repositories";
import {injectable} from "inversify";

@injectable()
export class PostsService {
    constructor(protected postsRepositories:PostsRepositories) {
    }
    async createPost(post: PostCreateType): Promise<false | string | ObjectId> {
        const newPostId = await this.postsRepositories.createPost(post)
        return newPostId ? newPostId : false
    }

    async updatePost(id: ObjectId, updatePost: PostUpdateType): Promise<boolean> {
        return await this.postsRepositories.updatePost(id, updatePost)
    }
    async updatePostLikeStatus(id: ObjectId, likeStatus: string): Promise<boolean> {
        return await this.postsRepositories.updatePostLikeStatus(id, likeStatus)
    }

    async deletePost(id: ObjectId): Promise<boolean> {
        return await this.postsRepositories.deletePost(id)
    }
}

