import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../Users/data.service';
import { commentImage } from './commentImg.model';
import { NgForm } from '@angular/forms';
import { Iimage, IimageResolved } from '../Users/image';

@Component({
  selector: 'app-img-comment',
  templateUrl: './img-comment.component.html',
  styleUrls: ['./img-comment.component.css']
})
export class ImgCommentComponent implements OnInit {
  imageId: number;
  selectedImage: any;
  errorMessage: any;
  gifComment: any;
  model = new commentImage('');
  isLoading: boolean;
  imgSuccess: boolean;
  imgError: boolean;


  constructor(private route: ActivatedRoute, private dataservice: DataService) { }

  ngOnInit() {
    this.imgSuccess = false;
    this.imgError = false;

    const resolvedData: IimageResolved = this.route.snapshot.data['resolvedData'];
    this.errorMessage = resolvedData.error;

    this.imageId = parseInt(this.route.snapshot.params['id']);
    //getting a post image by id
    this.dataservice.getImageArticleById(this.imageId).subscribe(
      (res: Iimage) => {
        // console.log(res.data)
        this.selectedImage = res.data
      },
      (err: any) => {}
    )
    //getting gif comments
    this.dataservice.getGifComment(this.imageId).subscribe(
      (res: any) => {
        //adding data to behavioural subject
        this.dataservice.myGifComment.next(res.data.comments);
      },
      (err: any) => {
        //handle error
      }
    )

    //subscribing to the behavioural subject in ngOnIint
    this.dataservice.myGifComment.subscribe(comments => {
      this.gifComment = comments;//equating comments to gifcomments 
    }, err => {
      //handle error
    })


  }
  //for posting comments under an image
  submitImgComment(form: NgForm) {
    this.isLoading = true;
    this.dataservice.postImgComment(this.imageId, this.model).subscribe(
      res => {
        if (res.status === 'success') {
          ;
          this.isLoading = false;
          this.imgSuccess = true;
          //updating the value of comments in the behavioural subject
          this.dataservice.loadingGifComment(this.imageId);
          this.successCommet();
          form.resetForm();
        } else {
          this.imgError = true;
          this.errorCommet();
        }
      },
      err => {
        this.imgError = true;
        this.errorCommet();
        this.isLoading = false;
      }
    );
    // console.log(this.model);
  }

  //removing the sucess modal after 3sec
  successCommet(): void {
    setTimeout(function () {
      this.imgSuccess = false;
    }.bind(this), 3000);
  }
  //removing the error modal after 3sec
  errorCommet(): void {
    setTimeout(function () {
      this.imgError = false;
    }.bind(this), 3000);
  }
  responseData = [{
    fontawesome: "fa fa-check-circle",
    message: "Commented SuccessFully"
  }]

  errorData = [{
    fontawesome: "fa fa-times-circle",
    message: "Error in Adding Comment"
  }]

}
