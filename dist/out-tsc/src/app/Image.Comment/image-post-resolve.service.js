import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
let ImagePostResolve = class ImagePostResolve {
    constructor(dataService) {
        this.dataService = dataService;
    }
    resolve(route, state) {
        const id = route.paramMap.get('id');
        if (isNaN(+id)) {
            const message = `Image Article ID was not a number : ${id}`;
            console.error(message);
            return of({ image: null, error: message });
        }
        return this.dataService.getImageArticleById(+id).pipe(map(image => ({ image: image })), catchError(error => {
            const message = `Retrival error: ${error}`;
            console.error(message);
            return of({ image: null, error: message });
        }));
    }
};
ImagePostResolve = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ImagePostResolve);
export { ImagePostResolve };
//# sourceMappingURL=image-post-resolve.service.js.map