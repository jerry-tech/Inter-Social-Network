import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let PostThumbnailComponent = class PostThumbnailComponent {
    constructor(feedservice, dataService) {
        this.feedservice = feedservice;
        this.dataService = dataService;
        this.idfromcomp = null;
        this.responseData = [{
                fontawesome: "fa fa-check-circle",
                message: "Post unflagging SuccessFull"
            }];
        this.errorData = [{
                fontawesome: "fa fa-times-circle",
                message: "Error in Unflagging Post"
            }];
        this.deleteData = [{
                postid: [],
                fontawesome: "fa fa-exclamation-triangle",
                message: "Confirm Deletion"
            }];
    }
    ngOnInit() {
    }
    isChecked(flag) {
        let valid = true;
        if (flag != 't') {
            valid = false;
        }
        return valid;
    }
    flagPost(id, value) {
        console.log(id, value);
        this.feedservice.flagAPost(id, value).subscribe(res => console.log(res), err => console.log(err));
    }
    unflagPost(id, value) {
        console.log(id, value);
        this.feedservice.flagAPost(id, value).subscribe(res => {
            if (res.message === 'flagged successfully') {
                document.getElementById('clickresponse').style.display = 'block';
            }
            else if (res.message === 'unflagged successfully') {
                document.getElementById('clickresponse').style.display = 'block';
            }
            else {
                document.getElementById('errorresponse').style.display = 'block';
            }
        }, err => console.log(err));
    }
    //deleting a flagged post
    delFlaggedPost(id) {
        this.dataService.deletePostById(id).subscribe(res => console.log(res), err => console.log(err));
    }
    deleteFlaggedPost(id) {
        document.getElementById('deleteresponse').style.display = 'block';
    }
};
tslib_1.__decorate([
    Input()
], PostThumbnailComponent.prototype, "feed", void 0);
PostThumbnailComponent = tslib_1.__decorate([
    Component({
        selector: 'app-post-thumbnail',
        templateUrl: './post-thumbnail.component.html',
        styleUrls: ['./post-thumbnail.component.css']
    })
], PostThumbnailComponent);
export { PostThumbnailComponent };
//# sourceMappingURL=post-thumbnail.component.js.map