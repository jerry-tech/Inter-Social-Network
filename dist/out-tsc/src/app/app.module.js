import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login.component';
import { PostComponent } from './Users/post.component';
import { IndexComponent } from './Home/index.component';
import { CommentComponent } from './Comments/comment.component';
import { PostThumbnailComponent } from './Thumbnail/post-thumbnail/post-thumbnail.component';
import { AdminComponent } from './Admin/admin.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './Login/token-interceptor.service';
import { ImgCommentComponent } from './Image.Comment/img-comment.component';
import { ResponseComponent } from './confirm/response.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DateComponent } from './PostDate/date.component';
import { SpinnerComponent } from './Spinner/spinner.component';
import { FontComponent } from './Font/font.component';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent,
            LoginComponent,
            PostComponent,
            IndexComponent,
            CommentComponent,
            PostThumbnailComponent,
            AdminComponent,
            ImgCommentComponent,
            ResponseComponent,
            DateComponent,
            SpinnerComponent,
            FontComponent,
        ],
        imports: [
            BrowserModule,
            BrowserAnimationsModule,
            ReactiveFormsModule,
            FormsModule,
            HttpClientModule,
            AppRoutingModule,
            ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
        ],
        providers: [
            {
                provide: HTTP_INTERCEPTORS,
                useClass: TokenInterceptorService,
                multi: true
            }
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map