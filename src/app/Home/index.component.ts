import { Component, OnInit } from '@angular/core';
import { FeedsService } from '../shared/feeds.service';
import { IFeedArt } from '../shared/feedart';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  _listFilter: string;
  allFeeds: IFeedArt[] = [];
  filteredFeeds: IFeedArt[];
  isLoading: boolean;

  constructor(private feeds: FeedsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isLoading = true;
  
    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      //using angular behavioural subject to get all feeds without loading the entire page
      this.feeds.getAllFeeds().subscribe(
        res => {
          this.isLoading = false;
          this.feeds.myData.next(res.data)
        }, err =>{
          
        }

      )
      //subscribing to behavioral subject
      this.feeds.myData.subscribe(allposts => {
        this.allFeeds = allposts;
        this.filteredFeeds = this.allFeeds;
        this.isLoading = false;
        }, err => {
          this.isLoading = true;
        }
      );

    })

  }
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredFeeds = this.listFilter ? this.performFilter(this.listFilter) : this.allFeeds;
  }
  performFilter(filterBy: string): IFeedArt[] {
    filterBy = filterBy.toLowerCase();
    return this.allFeeds.filter((feed: IFeedArt) => feed.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  isChecked(flag) {
    let valid = true;
    if (flag != 't') {
      valid = false;
    }
    return valid;
  }
}
