import dotenv from "dotenv";
import { Client } from "yay.js";
import { postItems } from "./model/Response";

dotenv.config();
const email: string = process.env.EMAIL ?? "";
const password: string = process.env.PASSWORD ?? "";

const main = async () => {
    const client = new Client();

    await client.login({
        email,
        password,
    });

    //#######
    const postCount: number =
        (await client.getMyPosts({ number: 1 })).posts[0].user?.postsCount ?? 0;
    // const postCount: number = 1;
    // console.log((await client.getPost({ postId: 383481368 })).post);

    const number: number | undefined = 20;
    const myPostsTexts: string[] = [];
    let fromPostId: number | undefined; //取得する際に基準となる投稿ID
    let postItems: postItems;
    for (let i = 0; i < Math.ceil(postCount / number); i++) {
        const myPosts = await client.getMyPosts({
            includeGroupPost: true,
            number,
            fromPostId,
        });
        const myPostsTextsData = myPosts.posts.map((post) => {
            fromPostId = post.id;
            if (
                !post.groupId &&
                !("inReplyTo" in post) &&
                (post.postType === "text" || post.postType === "image" || post.postType === "video")
            ) {
                const postItems: postItems = {
                    id: post.id ?? 0,
                    postContent: {
                        text: post.text,
                        attachment: [],
                        video: [],
                    },
                    createdAt: post.createdAt ?? 0,
                };

                if ("attachment" in post) {
                    const postProperty = Object.keys(post);

                    switch (true) {
                        case postProperty.includes("attachment"):
                            postItems.postContent.attachment?.push({
                                uri: post.attachment,
                                thumbnail: post.attachmentThumbnail,
                            });
                            break;
                        case postProperty.includes("attachment_2"):
                            postItems.postContent.attachment?.push({
                                uri: post.attachment_2,
                                thumbnail: post.attachment_2Thumbnail,
                            });
                            break;
                        case postProperty.includes("attachment_3"):
                            postItems.postContent.attachment?.push({
                                uri: post.attachment_3,
                                thumbnail: post.attachment_3Thumbnail,
                            });
                            break;
                        case postProperty.includes("attachment_4"):
                            postItems.postContent.attachment?.push({
                                uri: post.attachment_4,
                                thumbnail: post.attachment_4Thumbnail,
                            });
                            break;
                        case postProperty.includes("attachment_5"):
                            postItems.postContent.attachment?.push({
                                uri: post.attachment_5,
                                thumbnail: post.attachment_5Thumbnail,
                            });
                            break;
                        case postProperty.includes("attachment_6"):
                            postItems.postContent.attachment?.push({
                                uri: post.attachment_6,
                                thumbnail: post.attachment_6Thumbnail,
                            });
                            break;
                        case postProperty.includes("attachment_7"):
                            postItems.postContent.attachment?.push({
                                uri: post.attachment_7,
                                thumbnail: post.attachment_7Thumbnail,
                            });
                            break;
                        case postProperty.includes("attachment_8"):
                            postItems.postContent.attachment?.push({
                                uri: post.attachment_8,
                                thumbnail: post.attachment_8Thumbnail,
                            });
                            break;
                        case postProperty.includes("attachment_9"):
                            postItems.postContent.attachment?.push({
                                uri: post.attachment_9,
                                thumbnail: post.attachment_9Thumbnail,
                            });
                            break;

                        default:
                            break;
                    }
                }

                if (post.videos?.length) {
                    const videos = post.videos.map((video) => ({
                        uri: video.videoUrl,
                        thumbnail: video.thumbnailUrl,
                    }));
                    postItems.postContent.video = videos;
                }

                return JSON.stringify(postItems);
            } else {
                return "";
            }
        });
        const textsDatas = myPostsTextsData.filter((post) => post !== "");
        myPostsTexts.push(...textsDatas); //
    }
    // //###############
    console.log(myPostsTexts); //debug
    return myPostsTexts;

    //誰にブロックされているか確認
    // const blockUserIds = await client.getBlockedUserIds();
    // const blockUsersInfo = await client.getUsers({ userIds: blockUserIds });
    // const info = blockUsersInfo.users.map((user) => user.nickname);
    // console.log(info);
};

main();
