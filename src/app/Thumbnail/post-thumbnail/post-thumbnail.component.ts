import { Component, OnInit, Input } from '@angular/core';
import { FeedsService } from 'src/app/shared/feeds.service';
import { DataService } from 'src/app/Users/data.service';

@Component({
  selector: 'app-post-thumbnail',
  templateUrl: './post-thumbnail.component.html',
  styleUrls: ['./post-thumbnail.component.css']
})
export class PostThumbnailComponent implements OnInit {
  @Input() feed: any;
  idfromcomp: number = null;
  flagGood: boolean;
  flagErr: boolean;
  isLoading: boolean;
  clickresponse: boolean;
  errorresponse: boolean;
  deleteresponse: boolean;
  deleteError: boolean;


  constructor(private feedservice: FeedsService, private dataService: DataService) { }

  ngOnInit() {
    this.flagGood = false;
    this.flagErr = false;
    this.isLoading = false;
    this.clickresponse = false;
    this.deleteresponse = false;
    this.deleteError = false;
  }

  //method used to check if post is flagged
  isChecked(flag) {
    let valid = true;
    if (flag != 't') {
      valid = false;
    }
    return valid;
  }

  //flagging home page posts
  flagPost(id: number, value: any) {
    this.isLoading = true;
    // console.log(id, value);
    this.feedservice.flagAPost(id, value).subscribe(
      res => {
        if (res.message == 'flagged successfully') {
          this.isLoading = false;//disabling the loading spinner
          this.flagGood = true;// showing the response dialog
          this.feedservice.updateFeeds();//updating the homepage feeds behavioural subject
          this.flagSuccessfull();
          this.feedservice.updateFlagged();//updating the behavioural subject of flagged posts
        } else {
          this.isLoading = false;
          this.flagErr = true;
          this.flaggingErr();
        }
      },
      err => {
        this.isLoading = false;
        this.flagErr = true;
        this.flaggingErr();
      }
    )
  }

  //method for unflagging
  unflagPost(id: number, value: any) {
    this.isLoading = true;
    // console.log(id, value);
    
    this.feedservice.flagAPost(id, value).subscribe(
      res => {
        if (res.message === 'flagged successfully') {
          this.clickresponse = true;
          this.isLoading = false;
          this.feedservice.updateFeeds();//updating the homepage feeds behavioural subject
          this.adminUnflag();
          this.feedservice.updateFlagged();//updating the behavioural subject of flagged posts
        } else if (res.message === 'unflagged successfully') {
          this.isLoading = false;
          this.clickresponse = true;
          this.feedservice.updateFeeds();//updating the homepage feeds behavioural subject
          this.feedservice.updateFlagged();//updating the behavioural subject of flagged posts
          this.adminUnflag();
        }
      },
      err => {
        this.isLoading = false;
        this.errorresponse = false;
        this.unFlagError();
      }
    )
  }

  //deleting a flagged post
  delFlaggedPost(id: number) {
    this.isLoading = true;
    this.dataService.deletePostById(id).subscribe(
      res => {
        this.isLoading = false;
        this.deleteresponse = true;
        this.feedservice.updateFeeds();//updating the homepage feeds behavioural subject
        this.deleteSuc();
        this.feedservice.updateFlagged();//updating the behavioural subject of flagged posts
        
      },
      err =>{
        this.isLoading = false;
        this.deleteError = true;
        this.deleteErr();
      }
    )
  }
  
  flagSuccessfull() {
    setTimeout(function () {
      this.flagGood = false;
    }.bind(this), 5000);
  }
  flaggingErr() {
    setTimeout(function () {
      this.flagErr = false;
    }.bind(this), 5000);
  }
  adminUnflag() {
    setTimeout(function () {
      this.clickresponse = false;
    }.bind(this), 5000)
  }
  unFlagError() {
    setTimeout(function () {
      this.errorresponse = false;
    }.bind(this), 5000)
  }
  deleteSuc() {
    setTimeout(function () {
      this.deleteresponse = false;
    }.bind(this), 5000)
  }

  deleteErr() {
    setTimeout(function () {
      this.deleteError = false;
    }.bind(this), 5000)
  }

  flagSuccess = [{
    fontawesome: "fa fa-check-circle",
    message: "Post flagged SuccessFully"
  }]
  flagError = [{
    fontawesome: "fa fa-check-circle",
    message: "Post flagging Error"
  }]

  responseData = [{
    fontawesome: "fa fa-check-circle",
    message: "Post unflagging SuccessFull"
  }]

  errorData = [{
    fontawesome: "fa fa-times-circle",
    message: "Error in Unflagging Post"
  }]


  deleteData = [{
    fontawesome: "fa fa-check-circle",
    message: "Post Deleted Successfully"
  }]

  deleteIss = [{
    fontawesome: "fa fa-times-circle",
    message: "Post Deletion Error"
  }]



}
