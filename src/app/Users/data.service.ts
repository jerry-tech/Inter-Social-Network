import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Post } from './post.model';
import { Comment } from '../Comments/comment.model'
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Article } from './article';
import { Iimage } from './image';
import { Commented } from '../Comments/commented';
import { commentImage } from '../Image.Comment/commentImg.model';
import { UpdatePost } from './update.model';
import { IFeedArt } from '../shared/feedart';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _insertArticles = "https://myteamworkproject.herokuapp.com/v1/articles";
  private _insertImage = "https://myteamworkproject.herokuapp.com/v1/gifs";
  private _individualArticle = "https://myteamworkproject.herokuapp.com/v1/feed";
  private _insertComment = "comment";
  private _insertImgComment = "comment";
  option: HttpHeaders;
  public myPosts = new BehaviorSubject([]);
  public myArticleComment = new BehaviorSubject([]);
  public myGifComment = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }
  //posting text article to the server
  postArticles(post: Post): Observable<Article> {
    let body = JSON.stringify(post);

    let header = new HttpHeaders();
    this.option = header.append('content-type', 'application/json');

    return this.http.post<Article>(this._insertArticles, body, { headers: this.option }).pipe(
      tap(data => {
        //  console.log(JSON.stringify(data))
      }
      ),
      catchError(this.handleError)
    );
  }
  // getting a txt post by article id
  getArticleById(id: number): Observable<Article> {
    let getHeaders: HttpHeaders = new HttpHeaders({
      'content-type': 'application/json',
    });
    const url = `${this._insertArticles}/${id}`;
    return this.http.get<Article>(url, {
      headers: getHeaders
    })
  }
  //getting an image article by gif id
  getImageArticleById(id: number): Observable<Iimage> {
    let getHeaders: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'my-token'
    });
    const url = `${this._insertImage}/${id}`;
    return this.http.get<Iimage>(url, {
      headers: getHeaders
    })
  }
  //posting an image to the server
  addImage(title: string, image: File): Observable<Iimage> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    // console.log(formData);

    return this.http.post<Iimage>(this._insertImage, formData).pipe(
      tap(res => {
        // console.log(JSON.stringify(res))
      }),
      catchError(this.handleError)
    );
  }
  // adding comment to a text post
  postComment(id: number, comment: Comment): Observable<Commented> {
    let articlecomment = JSON.stringify(comment);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };

    const url = `${this._insertArticles}/${id}/${this._insertComment}`;
    // console.log('Posting Comment: ', Comment);
    return this.http.post<Commented>(url, articlecomment, options).pipe(
      tap(data => {
        // console.log(JSON.stringify(data))
      }),
      catchError(this.handleError)
    );

  }
  //adding comment to an image post
  postImgComment(id: number, imgcomment: commentImage): Observable<Commented> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    let imgarticleComment = JSON.stringify(imgcomment);

    const url = `${this._insertImage}/${id}/${this._insertImgComment}`;
    // console.log('Posting Image : ', imgComment);
    return this.http.post<Commented>(url, imgarticleComment, options).pipe(
      tap(data => {
        // console.log(JSON.stringify(data))
      }),
      catchError(this.handleError)
    )
  }

  //getting an article id to loop  txt post comment
  getArticleComment(id: number): Observable<Article> {
    let getHeaders: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json'
    });
    const url = `${this._insertArticles}/${id}`;
    return this.http.get<Article>(url, {
      headers: getHeaders
    })
  }
  //updating the behavioural subject for inserting comments
  loadingTxtComment(id: number) {
    this.getArticleComment(id).subscribe(article => {
      this.myArticleComment.next(article.data.comments);//////////
    })
  }
  //GETTING ALL COMMENT FROM AN IMG POST
  getGifComment(id: number): Observable<Iimage> {
    let getHeaders: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json'
    });
    const url = `${this._insertImage}/${id}`;
    return this.http.get<Iimage>(url, {
      headers: getHeaders
    })
  }

  loadingGifComment(id: number) {
    this.getGifComment(id).subscribe(gifcom => {
      this.myGifComment.next(gifcom.data.comments);
    })
  }
  // ---------------------------------------------------------------
  //getting an individuals post
  getPersonsPost(id: number): Observable<IFeedArt> {
    const url = `${this._individualArticle}/${id}`
    return this.http.get<IFeedArt>(url)
  }

  //updating the behavioural subject
  updatingPersonsPost(id: number) {
    this.getPersonsPost(id).subscribe(data => {
      this.myPosts.next(data.data);
    })
  }

  //deleting an txt individualsPost(article)
  deletePostById(id: number): Observable<void> {
    const url = `${this._insertArticles}/${id}`;
    return this.http.delete<void>(url)
  }
  //deleting a gif post by id
  deletegifPostById(id: number): Observable<Iimage[]> {
    const url = `${this._insertImage}/${id}`;
    return this.http.delete<Iimage[]>(url)
  }
  // update an article
  updateArticlePost(update: UpdatePost): Observable<any> {
    let body = JSON.stringify(update);
    const url = `${this._insertArticles}/${update.id}`;
    return this.http.patch<any>(url, update).pipe(
      tap(data => {
        // console.log(JSON.stringify(data))
      }),
      catchError(this.handleError)
    );

  }
  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
