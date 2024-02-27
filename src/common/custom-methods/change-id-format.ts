import {LIKE_STATUSES} from "../constants/http-statuses";

export const changeIdFormat = (post: any, isPostsByBlogId?:boolean) => {
    // if(isPostsByBlogId){
    //     let allLikeStatuses:any = post.extendedLikesInfo.usersLikeStatuses
    //     let newestLikes:any = post.extendedLikesInfo.newestLikes
    //     allLikeStatuses.forEach((item:any) => {
    //         if (item.likeStatus === LIKE_STATUSES.LIKE) {
    //             delete item.likeStatus
    //             newestLikes.push(item)
    //         }
    //     })
    //     post.extendedLikesInfo.newestLikes = newestLikes.sort((a:any, b:any) => {
    //         const addedAtA = a.addedAt.toUpperCase();
    //         const addedAtB = b.addedAt.toUpperCase();
    //         if (addedAtA < addedAtB) {
    //             return 1;
    //         }
    //         if (addedAtA > addedAtB) {
    //             return -1;
    //         }
    //         return 0;
    //     }).slice(0,3)
    // }
    post.id = post._id
    delete post._id
    delete post.extendedLikesInfo.usersLikeStatuses
    delete post.__v
    return post
}
export const changeBlogFormat = (obj: any) => {
    obj.id = obj._id
    delete obj._id
    delete obj.__v
    return obj
}
export const deleteMongoUserId = (obj: any) => {
    delete obj._id
    delete obj.userId
    return obj
}