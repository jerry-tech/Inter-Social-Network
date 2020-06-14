import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Post } from './post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UpdatePost } from './update.model';
let PostComponent = class PostComponent {
    constructor(dataService, feeds, route, router, http) {
        this.dataService = dataService;
        this.feeds = feeds;
        this.route = route;
        this.router = router;
        this.http = http;
        this.model = new Post('', '');
        this.updateModel = new UpdatePost('', '', '');
        this.responseData = [{
                fontawesome: "fa fa-check-circle",
                message: "Posted SuccessFully",
                navigateIn: "/Post",
                navigateTo: "clickresponse"
            }];
        this.errorData = [{
                fontawesome: "fa fa-times-circle",
                message: "Error in Posting"
            }];
        this.deleteSuccess = [{
                fontawesome: "fa fa-check-circle",
                message: "Post Successfully Deleted"
            }];
        this.deleteError = [{
                fontawesome: "fa fa-times-circle",
                message: "Error in Deleting Post"
            }];
        this.updateSuccess = [{
                fontawesome: "fa fa-check-circle",
                message: "Post Updated Successfully"
            }];
        this.updateError = [{
                fontawesome: "fa fa-times-circle",
                message: "Error in Updating Post"
            }];
        this.fontClass = [{
                fontawesome: "fa fa-hand-o-left"
            }];
        this.fontAddPost = [{
                fontawesome: "fa fa-plus"
            }];
        this.fontWarningIcon = [{
                fontawesome: "fa fa-exclamation-triangle",
            }];
        this.trashIcon = [{
                fontawesome: "fa fa-comment"
            }];
        this.updateIcon = [{
                fontawesome: "fa fa-wrench"
            }];
        this.deleteIcon = [{
                fontawesome: "fa fa-trash"
            }];
    }
    togglePostImg() {
        document.getElementById('post_text').style.display = 'block';
        document.getElementById('post_img').style.display = 'none';
    }
    togglePostText() {
        document.getElementById('post_text').style.display = 'none';
        document.getElementById('post_img').style.display = 'block';
    }
    togglerightContainer() {
        document.getElementById('right_cont').style.display = 'block';
        document.getElementById('left_cont').style.display = 'none';
    }
    toggleleftContainer() {
        document.getElementById('right_cont').style.display = 'none';
        document.getElementById('left_cont').style.display = 'block';
    }
    toggleArticle() {
        document.getElementById('postupdate').style.display = 'none';
        this.togglePostImg();
    }
    ngOnInit() {
        if (window.matchMedia("(min-width: 870px)").matches) {
            document.getElementById('right_cont').style.display = 'block';
            document.getElementById('left_cont').style.display = 'block';
        }
        this.isLoading = true; //loading spinner
        this.sessionUserId = +localStorage.getItem('userId');
        if (this.sessionUserId != null) {
            this.dataService.getPersonsPost(this.sessionUserId).subscribe((res) => {
                this.isLoading = false;
                this.dataService.myPosts.next(res.data);
            }, (error) => {
                this.isLoading = true; //loading spinner
                console.log(error);
            });
            //subscribing to the behavioural subject
            this.dataService.myPosts.subscribe(singleUserPost => {
                this.singlePost = singleUserPost;
            }, err => {
                console.log(err);
            });
        }
        this.imageForm = new FormGroup({
            'title': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
            'image': new FormControl(null, { validators: [Validators.required] }),
        });
    }
    //method for image preview
    onImagePicked(event) {
        const file = event.target.files[0];
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
        this.dataService.addImage(this.imageForm.value.title, this.selectedFile).subscribe(res => {
            if (res.status === 'success') {
                this.isLoading = false; //loading spinner
                document.getElementById('clickresponse').style.display = 'block';
                //for updating feeds without reloading using behavioural subject
                this.feeds.updateFeeds();
                this.dataService.updatingPersonsPost(this.sessionUserId);
            }
            else {
                document.getElementById('errorresponse').style.display = 'block';
            }
        }, err => console.log(err));
    }
    submitArticle(form) {
        // console.log(this.model);
        this.isLoading = true; //loading spinner
        this.dataService.postArticles(this.model)
            .subscribe((data) => {
            if (data.status == 'success') {
                this.isLoading = false; //loading spinner
                document.getElementById('clickresponse').style.display = 'block';
                //for updating feeds without reloading using behavioural subject
                this.feeds.updateFeeds();
                this.dataService.updatingPersonsPost(this.sessionUserId);
            }
            else {
                document.getElementById('errorresponse').style.display = 'block';
            }
        }, err => console.log('error: ', err));
        //for updating feeds without reloading using behavioural subject
        this.feeds.updateFeeds();
        this.dataService.updatingPersonsPost(this.sessionUserId);
    }
    //confrim delete
    confirmDelete(postId) {
        this.vpost = 'working';
        this.ypost = '';
        sessionStorage.setItem('clickPost', postId.toString());
        this.successConfrimMessage = "Are you sure you want to Delete ?";
        document.getElementById('modalcontent').style.display = "block";
    }
    confirmGifDel(postId) {
        this.vpost = '';
        this.ypost = 'working';
        sessionStorage.setItem('clickgifPost', postId.toString());
        this.successConfrimMessage = "Are you sure you want to Delete ?";
        document.getElementById('modalcontent').style.display = "block";
    }
    getDeleteArticle() {
        this.elementsValue = +sessionStorage.getItem('clickPost');
        let deletetxt = document.getElementById('deletetxt');
        if (deletetxt.innerHTML.trim() === 'Trash') {
            this.deleteIndividualsPost(this.elementsValue);
            console.log('Article Deletion' + sessionStorage.getItem('clickPost'));
        }
    }
    getDeleteGifs() {
        this.elementsValue = +sessionStorage.getItem('clickgifPost');
        let deleteGifs = document.getElementById('deletegif');
        if (deleteGifs.innerHTML.trim() === 'Delete') {
            this.deleteIndividualGifPost(this.elementsValue);
            console.log('Image Deletion' + sessionStorage.getItem('clickgifPost'));
        }
    }
    cancelDelete() {
        sessionStorage.clear();
        document.getElementById('modalcontent').style.display = "none";
    }
    //deleting an txt post
    deleteIndividualsPost(postId) {
        this.dataService.deletePostById(postId).subscribe((res) => {
            if (res.status === 'success') {
                this.deleteResponse = res.message;
                document.getElementById('deletesuccess').style.display = "block";
                document.getElementById('modalcontent').style.display = "none";
                sessionStorage.removeItem('clickPost');
            }
            else {
                document.getElementById('deleteerror').style.display = "block";
                document.getElementById('modalcontent').style.display = "none";
                sessionStorage.removeItem('clickPost');
            }
        }, (err) => console.log(err));
    }
    //deleting gif post 
    deleteIndividualGifPost(postId) {
        this.isLoading = true; //loading spinner
        console.log(postId);
        this.dataService.deletegifPostById(postId).subscribe((res) => {
            if (res.status == 'success') {
                this.isLoading = false; //loading spinner
                this.deleteImgResponse = res.message;
                document.getElementById('deletesuccess').style.display = "block";
                document.getElementById('modalcontent').style.display = "none";
                sessionStorage.removeItem('clickgifPost');
            }
            else {
                document.getElementById('deleteerror').style.display = "block";
                document.getElementById('modalcontent').style.display = "none";
                sessionStorage.removeItem('clickgifPost');
            }
        }, (err) => console.log(err));
    }
    okComment() {
        this.router.navigate(['/Post']);
        document.getElementById('clickresponse').style.display = 'none';
        sessionStorage.removeItem('clickPost');
        sessionStorage.removeItem('clickgifPost');
    }
    //getting the data by id for update 
    toggleUpdateArticle(id) {
        this.isLoading = true; //loading spinner
        document.getElementById('postupdate').style.display = 'block';
        document.getElementById('post_text').style.display = 'none';
        document.getElementById('post_img').style.display = 'none';
        if (window.matchMedia("(max-width: 993px)").matches) {
            document.getElementById('right_cont').style.display = 'none';
            document.getElementById('left_cont').style.display = 'block';
        }
        this.dataService.getArticleComment(id).subscribe(res => {
            this.updateId = res.data.id;
            this.updateTitle = res.data.title;
            this.updateArticle = res.data.article;
            this.isLoading = false; //loading spinner
        }, err => console.log(err));
    }
    //updating post article
    updatePostById(form) {
        this.isLoading = true; //loading spinner
        this.dataService.updateArticlePost(this.updateModel).subscribe(res => {
            if (res.status === 'success') {
                this.isLoading = false; //loading spinner
                document.getElementById('updatesuccess').style.display = "block";
            }
            else {
                document.getElementById('updateerror').style.display = "block";
            }
        }, err => console.log(err));
    }
};
PostComponent = tslib_1.__decorate([
    Component({
        selector: 'app-post',
        templateUrl: './post.component.html',
        styleUrls: ['./post.component.css']
    })
], PostComponent);
export { PostComponent };
//# sourceMappingURL=post.component.js.map