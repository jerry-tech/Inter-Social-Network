import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Comment } from './comment.model';
let CommentComponent = class CommentComponent {
    constructor(route, router, dataservice) {
        this.route = route;
        this.router = router;
        this.dataservice = dataservice;
        this.model = new Comment('');
        this.responseData = [{
                fontawesome: "fa fa-check-circle",
                message: "Commented SuccessFully"
            }];
        this.errorData = [{
                fontawesome: "fa fa-times-circle",
                message: "Error in Commenting"
            }];
    }
    ngOnInit() {
        this.articleId = parseInt(this.route.snapshot.params['id']);
        const resolvedData = this.route.snapshot.data['resolvedData'];
        this.errorMessage = resolvedData.error;
        //GETTING article by a specific id
        this.dataservice.getArticleById(this.articleId).subscribe((res) => {
            if (res.status == 'success') {
                this.selectedArticle = res.data;
                console.log(this.selectedArticle);
            }
        }, (err) => console.log(err));
        //getting comments for a particular article 
        this.dataservice.getArticleComment(this.articleId).subscribe((res) => {
            this.articleComment = res.data.comments;
            console.log(this.articleComment);
        }, (err) => console.log(err));
    }
    submitComment(form) {
        this.isLoading = true;
        this.dataservice.postComment(this.articleId, this.model).subscribe(res => {
            if (res.status === 'success') {
                this.isLoading = false;
                document.getElementById('clickresponse').style.display = "block";
            }
            else {
                document.getElementById('errorresponse').style.display = "block";
            }
        }, err => console.log(err));
    }
    okComment() {
        location.reload();
    }
};
CommentComponent = tslib_1.__decorate([
    Component({
        selector: 'app-comment',
        templateUrl: './comment.component.html',
        styleUrls: ['./comment.component.css']
    })
], CommentComponent);
export { CommentComponent };
//# sourceMappingURL=comment.component.js.map