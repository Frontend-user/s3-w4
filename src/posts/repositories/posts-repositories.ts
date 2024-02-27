import {ObjectId} from "mongodb";
import {PostCreateType, PostUpdateType} from "../../common/types/post-type";
import {CommentModel, PostModel} from "../../db";
import {injectable} from "inversify";
import {newestLikes, usersIdsLikeStatuses, usersIdsPostsLikeStatuses} from "../../schemas/schemas";
import {currentUser} from "../../application/current-user";
import {LIKE_STATUSES} from "../../common/constants/http-statuses";


@injectable()
export class PostsRepositories {
    async createPost(post: PostCreateType): Promise<false | string | ObjectId> {
        const response = await PostModel.create(post)
        return response ? response._id : false

    }

    async updatePost(id: ObjectId, updatePost: PostUpdateType): Promise<boolean> {
        const response = await PostModel.updateOne({_id: id}, updatePost)
        return response.matchedCount === 1;
    }

    async updatePostLikeStatus(id: ObjectId, likeStatus: string): Promise<boolean> {

        const userIdLikeStatus: usersIdsPostsLikeStatuses = {
            userId: currentUser.userId,
            likeStatus: likeStatus,
            addedAt: new Date().toISOString(),
            login: currentUser.userLogin
        }
        const newestLike: newestLikes = {
            addedAt: new Date().toISOString(),
            userId: currentUser.userId,
            login: currentUser.login
        }

        const post: any = await PostModel.findOne({_id: id})
        let postLikeStatusesArray: usersIdsLikeStatuses[] = post.extendedLikesInfo.usersLikeStatuses
        let findObject = postLikeStatusesArray.find(o => o.userId === currentUser.userId)


        if (!findObject && likeStatus !== LIKE_STATUSES.NONE) {

            if (likeStatus === LIKE_STATUSES.LIKE) {
                let currentLikes = post.extendedLikesInfo.likesCount
                currentLikes++
                post.extendedLikesInfo.likesCount = currentLikes
            } else {
                let currentDislikes = post.extendedLikesInfo.dislikesCount
                currentDislikes++
                post.extendedLikesInfo.dislikesCount = currentDislikes
            }

            post.extendedLikesInfo.myStatus = likeStatus
            post.extendedLikesInfo.usersLikeStatuses.push(userIdLikeStatus)
            post.markModified('extendedLikesInfo')
            await post.save()
        }


        if (likeStatus !== LIKE_STATUSES.NONE && findObject && findObject.likeStatus !== likeStatus) {
            const getPost: any = await PostModel.findOne({_id: id})
            let dislikes: number = getPost.extendedLikesInfo.dislikesCount
            let likes: number = getPost.extendedLikesInfo.likesCount
            if (likeStatus === LIKE_STATUSES.DISLIKE) {
                dislikes++
                likes--
            } else {
                likes++
                dislikes--

            }

            await PostModel.updateOne({_id: id, 'extendedLikesInfo.usersLikeStatuses.userId': currentUser.userId}, {
                '$set': {
                    'extendedLikesInfo.myStatus': likeStatus,
                    'extendedLikesInfo.likesCount': likes,
                    'extendedLikesInfo.dislikesCount': dislikes,
                    'extendedLikesInfo.usersLikeStatuses.$.likeStatus': likeStatus
                }
            })
            const updatedPost: any = await PostModel.findOne({_id: id})
        }

        if (likeStatus === LIKE_STATUSES.NONE && findObject && likeStatus !== post.extendedLikesInfo.myStatus) {
            const getPost: any = await PostModel.findOne({_id: id})
            let dislikes: number = getPost.extendedLikesInfo.dislikesCount
            let likes: number = getPost.extendedLikesInfo.likesCount
            let pastLikeStatus = getPost.extendedLikesInfo.myStatus
            if (pastLikeStatus === LIKE_STATUSES.DISLIKE) {
                dislikes--
            } else {
                likes--
            }
            await PostModel.updateOne(
                {_id: id},
                {
                    '$set': {
                        'extendedLikesInfo.myStatus': LIKE_STATUSES.NONE,
                        'extendedLikesInfo.likesCount': likes,
                        'extendedLikesInfo.dislikesCount': dislikes,
                    },
                    $pull: {'extendedLikesInfo.usersLikeStatuses': {userId: currentUser.userId}}
                }
            );

        }

        return true;
    }

    async deletePost(id: ObjectId): Promise<boolean> {
        const response = await PostModel.deleteOne({_id: id})
        return !!response.deletedCount;
    }
}
