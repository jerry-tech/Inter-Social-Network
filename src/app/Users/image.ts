export interface Iimage {
    data: any,
    title: string;
    image: File;
    status: string;
    comment: {
        gif_comment_id: number;
        comment: string;
        createdOn: number;
        users_user_id: number;
        gifs_gif_id: string;
    }
}
export interface IimageResolved {
    image: Iimage;
    error?: any;
}
