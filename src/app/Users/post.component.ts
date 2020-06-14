import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { DataService } from './data.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdatePost } from './update.model';
import { FeedsService } from '../shared/feeds.service';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  imagePreview: any;
  imageForm: FormGroup;
  sessionUserId: number;
  singlePost: any;
  deleteResponse: any;
  deleteImgResponse: any;
  fontSuccess: string;
  successErrorMessage: string;
  postSuccessMessage: string;
  successConfrimMessage: string;
  fontWarning: string;
  elementsValue: number;
  vpost: any;
  ypost: string;
  selectedFile: any;
  updateTitle: any;
  updateArticle: any;
  updateId: any;
  isLoading: boolean;
  clicksuccess: boolean;
  modalcontent: boolean;
  errorresponse: any;
  deletesuccess: boolean;
  deleteerror: boolean;
  updatesuccess: boolean;
  updateerror: boolean;
  post_text: boolean;
  post_img: boolean;
  right_cont: boolean;
  left_cont: boolean;
  postupdate: boolean;


  constructor(private dataService: DataService, private feeds: FeedsService, private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  model = new Post('', '');
  updateModel = new UpdatePost('', '', '');


  ngOnInit() {
    //toggling the post containers
    this.post_text = true;
    this.post_img = false;
    this.right_cont = true;
    this.left_cont = true;

    this.isLoading = true; //loading spinner
    //used to set the modal to none
    this.clicksuccess = false;
    // modal message
    //  this.modalcontent = false;

    //delete message
    this.errorresponse = false;

    //on delete success
    this.deletesuccess = false;

    //deleting error
    this.deleteerror = false;

    //update success
    this.updatesuccess = false;

    //update error
    this.updateerror = false;

    this.sessionUserId = +localStorage.getItem('userId');
    if (this.sessionUserId != null) {

      this.dataService.getPersonsPost(this.sessionUserId).subscribe(
        (res: any) => {
          this.isLoading = false;
          this.dataService.myPosts.next(res.data);
        },
        (error: any) => {
          this.isLoading = true; //loading spinner
          // console.log(error)
        }

      )
      //subscribing to the behavioural subject
      this.dataService.myPosts.subscribe(singleUserPost => {
        this.singlePost = singleUserPost;
        // console.log(this.singlePost)
      },
        err => {
          //handle error
        }
      )
    }
    this.imageForm = new FormGroup({
      'title': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      'image': new FormControl(null, { validators: [Validators.required] }),

    });
  }


  togglePostImg(): void {
    this.post_text = true;
    this.post_img = false;
  }
  togglePostText() {
    this.post_text = false;
    this.post_img = true;
  }
  togglerightContainer(): void {
    this.right_cont = true;
    this.left_cont = false;
  }
  toggleleftContainer(): void {
    this.right_cont = false;
    this.left_cont = true;
  }

  toggleArticle() {
    this.postupdate = false;
    this.togglePostImg();
  }

  //method used to check if method is flagged
  isChecked(flag) {
    let valid = true;
    if (flag != 't') {
      valid = false;
    }
    return valid;
  }

  //method for image preview
  onImagePicked(event: Event) {
    const file = <File>(event.target as HTMLInputElement).files[0];
    this.imageForm.patchValue({ image: file });
    this.imageForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;

    };
    reader.readAsDataURL(file);
    this.selectedFile = file;
  }
  //method for submiting image article to the server
  onUpload() {
    this.isLoading = true; //loading spinner

    this.dataService.addImage(this.imageForm.value.title, this.selectedFile).subscribe(
      res => {
        if (res.status === 'success') {
          this.isLoading = false; //loading spinner
          this.clicksuccess = true;
          //for updating feeds without reloading using behavioural subject
          this.feeds.updateFeeds();//updating the homepage feeds
          this.dataService.updatingPersonsPost(this.sessionUserId);
          this.successClickMess();
          //used to reset the form
          this.imageForm.reset();

        } else {

          this.clicksuccess = false;
        }
      },
      err => {
        this.errorresponse = true;
        this.errorPosting();
      }
    )
  }

  submitArticle(form: NgForm) {
    // console.log(this.model);
    this.isLoading = true; //loading spinner

    this.dataService.postArticles(this.model)
      .subscribe(
        (data) => {
          if (data.status == 'success') {
            this.isLoading = false; //loading spinner
            this.clicksuccess = true;
            //for updating feeds without reloading using behavioural subject
            this.feeds.updateFeeds();//updating the homepage feeds
            this.dataService.updatingPersonsPost(this.sessionUserId);
            //used to set time out
            this.successClickMess();
            //used to reset the form
            form.resetForm();
          } else {
            // this.errorresponse = true;
            this.clicksuccess = false;
            form.resetForm();
          }
        },
        err => {
          this.errorresponse = true;
          this.errorPosting();
        }
      );

  }

  //confrim delete of an article
  confirmDelete(postId: number) {
    this.vpost = 'working';
    this.ypost = '';
    sessionStorage.setItem('clickPost', postId.toString());
    this.successConfrimMessage = "Are you sure you want to Delete ?";
    this.modalcontent = true;
  }
  // confirms delete of a gif post
  confirmGifDel(postId: number) {
    this.vpost = '';
    this.ypost = 'working';
    sessionStorage.setItem('clickgifPost', postId.toString());
    this.successConfrimMessage = "Are you sure you want to Delete ?";

    this.modalcontent = true;
  }
  getDeleteArticle() {
    this.elementsValue = +sessionStorage.getItem('clickPost');
    let deletetxt = document.getElementById('deletetxt');
    if (deletetxt.innerHTML.trim() === 'Trash') {
      this.deleteIndividualsPost(this.elementsValue);
      // console.log('Article Deletion' + sessionStorage.getItem('clickPost'));
    }
  }
  getDeleteGifs() {
    this.elementsValue = +sessionStorage.getItem('clickgifPost');
    let deleteGifs = document.getElementById('deletegif');

    if (deleteGifs.innerHTML.trim() === 'Delete') {
      this.deleteIndividualGifPost(this.elementsValue);
      // console.log('Image Deletion' + sessionStorage.getItem('clickgifPost'));
    }
  }

  cancelDelete() {
    sessionStorage.clear();
    this.modalcontent = false;
  }

  //deleting an txt post
  deleteIndividualsPost(postId: number) {

    this.dataService.deletePostById(postId).subscribe(
      (res: any) => {
        if (res.status === 'success') {
          this.deleteResponse = res.message
          this.deletesuccess = true;
          this.modalcontent = false;
          this.deleteSuccessfull();
          //for updating feeds without reloading using behavioural subject
          this.feeds.updateFeeds();//updating the homepage feeds
          this.dataService.updatingPersonsPost(this.sessionUserId);

          sessionStorage.removeItem('clickPost');
        } else {
          this.deleteerror = true;
          this.modalcontent = false;
          this.deletingError();
          sessionStorage.removeItem('clickPost');
        }
      },
      (err: any) => {
        this.deleteerror = true;
          this.modalcontent = false;
          this.deletingError();
          sessionStorage.removeItem('clickPost');
      }
    )
  }
  //deleting gif post 
  deleteIndividualGifPost(postId: number) {

    this.isLoading = true; //loading spinner
    // console.log(postId);
    this.dataService.deletegifPostById(postId).subscribe(
      (res: any) => {
        if (res.status == 'success') {
          this.isLoading = false; //loading spinner
          this.deleteImgResponse = res.message
          this.deletesuccess = true;
          this.modalcontent = false;
          this.deleteSuccessfull();

          //for updating feeds without reloading using behavioural subject
          this.feeds.updateFeeds();//updating the homepage feeds
          this.dataService.updatingPersonsPost(this.sessionUserId);

          sessionStorage.removeItem('clickgifPost');
        } else {
          this.deleteerror = true;
          this.modalcontent = false;
          this.deletingError();
          sessionStorage.removeItem('clickgifPost');
        }
      },
      (err: any) => {
        this.deleteerror = true;
        this.modalcontent = false;
        this.deletingError();
        sessionStorage.removeItem('clickgifPost');
      }
    )
  }
  okComment(): void {
    this.router.navigate(['/Post']);
    sessionStorage.removeItem('clickPost');
    sessionStorage.removeItem('clickgifPost');
  }

  //getting the data by id for update 
  toggleUpdateArticle(id: number) {
    this.isLoading = true; //loading spinner

    this.postupdate = true;
    this.post_text = false;
    this.post_img = false;

    if (window.matchMedia("(max-width: 993px)").matches) {
      this.right_cont = false;
      this.left_cont = true;
    }
    this.dataService.getArticleComment(id).subscribe(
      res => {
        this.updateId = res.data.id;
        this.updateTitle = res.data.title;
        this.updateArticle = res.data.article;
        this.isLoading = false; //loading spinner
      },
      err => {/*handle error*/}
    )
  }
  //updating post article
  updatePostById(form: NgForm) {
    this.isLoading = true; //loading spinner
    this.dataService.updateArticlePost(this.updateModel).subscribe(
      res => {
        if (res.status === 'success') {
          this.isLoading = false; //loading spinner
          this.updatesuccess = true;
          //used to set time out
          this.successUpdateMess();
          //for updating feeds without reloading using behavioural subject
          this.feeds.updateFeeds();//updating the homepage feeds
          this.dataService.updatingPersonsPost(this.sessionUserId);
          form.resetForm();

          this.updatesuccess = true;
        } else {
          this.updateerror = true;
        }
      },
      err => {/*handle error*/}
    )
  };
  errorPosting() {
    setTimeout(function () {
      this.errorresponse = false;
    }.bind(this), 3000)
  }

  successClickMess(): void {

    setTimeout(function () {
      this.clicksuccess = false;
      // console.log(this.clicksuccess);
    }.bind(this), 3000);
  }

  successUpdateMess() {
    setTimeout(function () {
      this.updatesuccess = false;
    }.bind(this), 3000);
  }
  deleteSuccessfull() {
    setTimeout(function () {
      this.deletesuccess = false;
      sessionStorage.removeItem('clickPost');
      sessionStorage.removeItem('clickgifPost');
    }.bind(this), 3000);
  }
  deletingError() {
    setTimeout(function () {
      sessionStorage.removeItem('clickPost');
      sessionStorage.removeItem('clickgifPost');
      this.deleteerror = false;
    }.bind(this), 3000);
  }

  responseData = [{
    fontawesome: "fa fa-check-circle",
    message: "Posted SuccessFully",
    navigateTo: "/Home",
  }]

  errorData = [{
    fontawesome: "fa fa-times-circle",
    message: "Error in posting check Network Connection"
  }]
  deleteSuccess = [{
    fontawesome: "fa fa-check-circle",
    message: "Post Successfully Deleted",
  }]
  deleteError = [{
    fontawesome: "fa fa-times-circle",
    message: "Error in Deleting Post Check Network Connection"
  }]
  updateSuccess = [{
    fontawesome: "fa fa-check-circle",
    message: "Post Updated Successfully",
  }]
  updateError = [{
    fontawesome: "fa fa-times-circle",
    message: "Error in Updating Post Check Network Connection"
  }]

  fontClass = [{
    fontawesome: "fa fa-hand-o-left"
  }]

  fontAddPost = [{
    fontawesome: "fa fa-plus"
  }]

  fontWarningIcon = [{
    fontawesome: "fa fa-exclamation-triangle",
  }]

  trashIcon = [{
    fontawesome: "fa fa-comment"
  }]

  updateIcon = [{
    fontawesome: "fa fa-wrench"
  }]

  deleteIcon = [{
    fontawesome: "fa fa-trash"
  }]
}
