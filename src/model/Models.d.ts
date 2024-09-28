export interface attachment {
    uri?: string;
    thumbnail?: string;
}

export interface video {
    uri?: string;
    thumbnail?: string;
}

export interface postContent {
    text?: string;
    attachment?: attachment[];
    video?: video[];
}
