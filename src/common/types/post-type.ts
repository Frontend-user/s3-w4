import {ObjectId} from "mongodb";
import {newestLikes, usersIdsLikeStatuses} from "../../schemas/schemas";



export type PostEntityType = {
    _id: ObjectId
    title: string
    shortDescription: string
    content: string
    blogId: string | ObjectId
    blogName: string
    createdAt: string
    extendedLikesInfo: {
        likesCount: number,
        dislikesCount: number,
        myStatus: string,
        newestLikes?: newestLikes[],
        usersLikeStatuses?: usersIdsLikeStatuses[]
    }
}

export type  PostViewType = Omit<PostEntityType, '_id'> & {
    id: string
}
export type  PostCreateType = Omit<PostEntityType, '_id'>
export type PostUpdateType = Omit<PostEntityType, '_id' | 'createdAt' | 'blogName' | 'likesInfo' | 'extendedLikesInfo'>
export type PostUpdateTypeForBind = Omit<PostEntityType, '_id' | 'createdAt' | 'blogName' | 'blogId'>