import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Comment } from '../Comments/comment.model';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
let DataService = class DataService {
    constructor(http) {
        this.http = http;
        this._insertArticles = "https://myteamworkproject.herokuapp.com/v1/articles";
        this._insertImage = "https://myteamworkproject.herokuapp.com/v1/gifs";
        this._individualArticle = "https://myteamworkproject.herokuapp.com/v1/feed";
        this._insertComment = "comment";
        this._insertImgComment = "comment";
        this.myPosts = new BehaviorSubject([]);
    }
    //posting text article to the server
    postArticles(post) {
        let body = JSON.stringify(post);
        let header = new HttpHeaders();
        this.option = header.append('content-type', 'application/json');
        return this.http.post(this._insertArticles, body, { headers: this.option }).pipe(tap(data => console.log(JSON.stringify(data))), catchError(this.handleError));
    }
    // getting a txt post by article id
    getArticleById(id) {
        let getHeaders = new HttpHeaders({
            'content-type': 'application/json',
        });
        const url = `${this._insertArticles}/${id}`;
        return this.http.get(url, {
            headers: getHeaders
        });
    }
    //getting an image article by gif id
    getImageArticleById(id) {
        let getHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': 'my-token'
        });
        const url = `${this._insertImage}/${id}`;
        return this.http.get(url, {
            headers: getHeaders
        });
    }
    //posting an image to the server
    addImage(title, image) {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        console.log(formData);
        return this.http.post(this._insertImage, formData).pipe(tap(res => console.log(JSON.stringify(res))), catchError(this.handleError));
    }
    // adding comment to a text post
    postComment(id, comment) {
        let articlecomment = JSON.stringify(comment);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        let options = { headers: headers };
        const url = `${this._insertArticles}/${id}/${this._insertComment}`;
        console.log('Posting Comment: ', Comment);
        return this.http.post(url, articlecomment, options).pipe(tap(data => console.log(JSON.stringify(data))), catchError(this.handleError));
    }
    //adding comment to an image post
    postImgComment(id, imgcomment) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        let options = { headers: headers };
        let imgarticleComment = JSON.stringify(imgcomment);
        const url = `${this._insertImage}/${id}/${this._insertImgComment}`;
        // console.log('Posting Image : ', imgComment);
        return this.http.post(url, imgarticleComment, options).pipe(tap(data => console.log(JSON.stringify(data))), catchError(this.handleError));
    }
    //getting an article id to loop  txt post comment
    getArticleComment(id) {
        let getHeaders = new HttpHeaders({
            'Accept': 'application/json'
        });
        const url = `${this._insertArticles}/${id}`;
        return this.http.get(url, {
            headers: getHeaders
        });
    }
    //GETTING ALL COMMENT FROM AN IMG POST
    getGifComment(id) {
        let getHeaders = new HttpHeaders({
            'Accept': 'application/json'
        });
        const url = `${this._insertImage}/${id}`;
        return this.http.get(url, {
            headers: getHeaders
        });
    }
    // ---------------------------------------------------------------
    //getting an individuals post
    getPersonsPost(id) {
        const url = `${this._individualArticle}/${id}`;
        return this.http.get(url);
    }
    updatingPersonsPost(id) {
        this.getPersonsPost(id).subscribe(data => {
            this.myPosts.next(data.data);
        });
    }
    //deleting an txt individualsPost(article)
    deletePostById(id) {
        const url = `${this._insertArticles}/${id}`;
        return this.http.delete(url);
    }
    //deleting a gif post by id
    deletegifPostById(id) {
        const url = `${this._insertImage}/${id}`;
        return this.http.delete(url);
    }
    // update an article
    updateArticlePost(update) {
        let body = JSON.stringify(update);
        const url = `${this._insertArticles}/${update.id}`;
        return this.http.patch(url, update).pipe(tap(data => console.log(JSON.stringify(data))), catchError(this.handleError));
    }
    handleError(err) {
        let errorMessage;
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        }
        else {
            errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }
};
DataService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], DataService);
export { DataService };
//# sourceMappingURL=data.service.js.map