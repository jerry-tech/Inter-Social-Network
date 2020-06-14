export interface Article {
    data:any;
    status: string;
    id: number;
    title: string;
    article: string;
    comment_id: number,
    article_article_id: number;
    users_user_id: number;
    createdOn: string;
    comments: {
        id: string;
        title: string;
        article: string;
    };
}
export interface ArticleResolved {
    article: Article;
    error?: any;
}

