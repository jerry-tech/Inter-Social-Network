import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../Users/data.service';
import { Article, ArticleResolved } from '../Users/article';
import { Comment } from './comment.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  selectedArticle: any;
  articleComment: any;
  model = new Comment('');
  errorMessage: any;
  imageId: number;
  fontSuccess : string;
  successErrorMessage : string;
  isLoading: boolean;
  successComment: boolean;
  errorArticle: boolean;
 
  
  constructor(private route: ActivatedRoute,private router: Router ,private dataservice: DataService) { }
  articleId: number;

  ngOnInit() {
    this.successComment = false;
    this.errorArticle = false;

    this.articleId = parseInt(this.route.snapshot.params['id']);
    
    const resolvedData: ArticleResolved = this.route.snapshot.data['resolvedData'];
    this.errorMessage = resolvedData.error;
    //GETTING article by a specific id
    this.dataservice.getArticleById(this.articleId).subscribe(
      (res: Article) => {
        if(res.status == 'success'){
          this.selectedArticle = res.data
        }
        },
      (err: any) => {}
    )
    //getting comments for a particular article 
    this.dataservice.getArticleComment(this.articleId).subscribe(
      (res: any) =>{
        //adding data to behavioural subject
        this.dataservice.myArticleComment.next(res.data.comments);
      } ,
      (err: any) => {}
    )

    //subscribing to the behavioural subject in ngOnIint
    this.dataservice.myArticleComment.subscribe(comments => {
      this.articleComment = comments;//equating comments to gifcomments 
    }, err => {
      //handle error
    })

  }
 
  //method used for summiting comment on an article
  submitComment(form: NgForm) {
    this.isLoading = true;
    this.dataservice.postComment(this.articleId, this.model).subscribe(
      res => {
        if(res.status === 'success'){
          this.isLoading = false;
          this.successComment = true;
          this.successCommet();
          form.resetForm();
          this.dataservice.loadingTxtComment(this.articleId);//method used to update
        }else{
          this.errorArticle = true;
          this.errorComment();
          this.isLoading = false;
        }
      },
      err => {
        this.errorArticle = true;
        this.errorComment();
      }
    );
  }
  //removing the sucess modal after 3sec
  successCommet(): void {
    setTimeout(function () {
      this.successComment = false;
    }.bind(this), 3000);
  }
  //removing the error modal after 3sec
  errorComment(): void {
    setTimeout(function () {
      this.errorArticle = false;
    }.bind(this), 3000);
  }
  responseData = [{
    fontawesome: "fa fa-check-circle",
    message: "Commented SuccessFully"
  }]

  errorData = [{
    fontawesome: "fa fa-times-circle",
    message: "Error in Commenting"
  }]
 
}
