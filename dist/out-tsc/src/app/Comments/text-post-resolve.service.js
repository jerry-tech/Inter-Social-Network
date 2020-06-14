import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
let ArticlePostResolve = class ArticlePostResolve {
    constructor(dataService) {
        this.dataService = dataService;
    }
    resolve(route, state) {
        const id = route.paramMap.get('id');
        if (isNaN(+id)) {
            const message = `Article ID was not a number : ${id}`;
            console.error(message);
            return of({ article: null, error: message });
        }
        return this.dataService.getArticleById(+id).pipe(map(article => ({ article: article })), catchError(error => {
            const message = `Retrival error: ${error}`;
            console.error(message);
            return of({ article: null, error: message });
        }));
    }
};
ArticlePostResolve = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ArticlePostResolve);
export { ArticlePostResolve };
//# sourceMappingURL=text-post-resolve.service.js.map