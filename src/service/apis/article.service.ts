import { httpClient } from "./../../lib/httpClient";

export const getArticleList = (params: any): any => {
    return httpClient.get('/article/view/all', { params: params })
} 

export const getArticleViewById = (articleId: string) => {
    return httpClient.get(`/article/view/id/${articleId}`)
}