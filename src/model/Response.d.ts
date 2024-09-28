import { postContent } from "./Models";

export interface postItems {
    id: number;
    postContent: postContent;
    createdAt?: number;
}
