import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let IndexComponent = class IndexComponent {
    constructor(feeds, route) {
        this.feeds = feeds;
        this.route = route;
        this.allFeeds = [];
    }
    ngOnInit() {
        this.isLoading = true;
        this.route.paramMap.subscribe((paramMap) => {
            //using angular behavioural subject to get all feeds without loading the entire page
            this.feeds.getAllFeeds().subscribe(res => {
                this.feeds.myData.next(res.data);
                this.isLoading = false;
            });
            //subscribing to behavioral subject
            this.feeds.myData.subscribe(allposts => {
                this.allFeeds = allposts;
                this.filteredFeeds = this.allFeeds;
            }, err => {
                console.log(err);
            });
        });
    }
    get listFilter() {
        return this._listFilter;
    }
    set listFilter(value) {
        this._listFilter = value;
        this.filteredFeeds = this.listFilter ? this.performFilter(this.listFilter) : this.allFeeds;
    }
    performFilter(filterBy) {
        filterBy = filterBy.toLowerCase();
        return this.allFeeds.filter((feed) => feed.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
    isChecked(flag) {
        let valid = true;
        if (flag != 't') {
            valid = false;
        }
        return valid;
    }
};
IndexComponent = tslib_1.__decorate([
    Component({
        selector: 'app-index',
        templateUrl: './index.component.html',
        styleUrls: ['./index.component.css']
    })
], IndexComponent);
export { IndexComponent };
//# sourceMappingURL=index.component.js.map