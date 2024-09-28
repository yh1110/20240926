import dotenv from "dotenv";
import { Client } from "yay.js";

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
    const number: number | undefined = 20;
    const myPostsTexts: string[] = [];
    let fromPostId: number | undefined; //取得する際に基準となる投稿ID
    for (let i = 0; i < Math.ceil(postCount / number); i++) {
        const myPosts = await client.getMyPosts({
            includeGroupPost: true,
            number,
            fromPostId,
        });
        const myPostsTextsData: string[] = myPosts.posts.map((post) => {
            fromPostId = post.id;
            if (!post.groupId && !("inReplyTo" in post) && post.postType === "text") {
                const text: string = post.text ?? "";
                return text;
            } else {
                return "";
            }
        });
        const textsDatas: string[] = myPostsTextsData.filter((post) => post !== "");
        myPostsTexts.push(...textsDatas);
    }
    //###############
    console.log(myPostsTexts); //debug

    //誰にブロックされているか確認
    // const blockUserIds = await client.getBlockedUserIds();
    // const blockUsersInfo = await client.getUsers({ userIds: blockUserIds });
    // const info = blockUsersInfo.users.map((user) => user.nickname);
    // console.log(info);
};

main();
