import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { commentImage } from './commentImg.model';
let ImgCommentComponent = class ImgCommentComponent {
    constructor(route, dataservice) {
        this.route = route;
        this.dataservice = dataservice;
        this.model = new commentImage('');
        this.responseData = [{
                fontawesome: "fa fa-check-circle",
                message: "Commented SuccessFully"
            }];
        this.errorData = [{
                fontawesome: "fa fa-times-circle",
                message: "Error in Adding Comment"
            }];
    }
    ngOnInit() {
        const resolvedData = this.route.snapshot.data['resolvedData'];
        this.errorMessage = resolvedData.error;
        this.imageId = parseInt(this.route.snapshot.params['id']);
        //getting a post image by id
        this.dataservice.getImageArticleById(this.imageId).subscribe((res) => {
            console.log(res.data);
            this.selectedImage = res.data;
        }, (err) => console.log(err));
        //getting gif comments
        this.dataservice.getGifComment(this.imageId).subscribe((res) => {
            this.gifComment = res.data.comments;
            console.log(this.gifComment);
        }, (err) => console.log(err));
    }
    submitImgComment(form) {
        this.isLoading = true;
        this.dataservice.postImgComment(this.imageId, this.model).subscribe(res => {
            if (res.status === 'success') {
                ;
                this.isLoading = false;
                document.getElementById('clickresponse').style.display = "block";
            }
            else {
                document.getElementById('errorresponse').style.display = "block";
            }
        }, err => console.log(err));
        console.log(this.model);
    }
    okComment() {
        location.reload();
    }
};
ImgCommentComponent = tslib_1.__decorate([
    Component({
        selector: 'app-img-comment',
        templateUrl: './img-comment.component.html',
        styleUrls: ['./img-comment.component.css']
    })
], ImgCommentComponent);
export { ImgCommentComponent };
//# sourceMappingURL=img-comment.component.js.map