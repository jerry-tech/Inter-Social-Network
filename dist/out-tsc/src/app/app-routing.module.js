import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IndexComponent } from './Home/index.component';
import { PostComponent } from './Users/post.component';
import { CommentComponent } from './Comments/comment.component';
import { AdminComponent } from './Admin/admin.component';
import { LoginComponent } from './Login/login.component';
import { AuthGuard } from './auth.guard';
import { ImagePostResolve } from './Image.Comment/image-post-resolve.service';
import { AdminGuard } from './Admin/admin.guard';
import { ImgCommentComponent } from './Image.Comment/img-comment.component';
import { ArticlePostResolve } from './Comments/text-post-resolve.service';
import { PostGuard } from './Users/post.guard';
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [
            RouterModule.forRoot([
                { path: 'Home', component: IndexComponent },
                { path: '', redirectTo: 'Home', pathMatch: 'full' },
                { path: 'Post', component: PostComponent,
                    canActivate: [AuthGuard],
                    canDeactivate: [PostGuard]
                },
                { path: 'Comment/:id', component: CommentComponent, resolve: {
                        resolvedData: ArticlePostResolve
                    } },
                { path: 'ImageComment/:id', component: ImgCommentComponent, resolve: {
                        resolvedData: ImagePostResolve
                    } },
                { path: 'Admin', component: AdminComponent, canActivate: [AuthGuard],
                    canDeactivate: [AdminGuard]
                },
                { path: 'Login', component: LoginComponent },
                { path: '**', redirectTo: 'Home', pathMatch: 'full' }
            ])
        ],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map