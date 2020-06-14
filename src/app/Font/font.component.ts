import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-font',
  templateUrl: './font.component.html',
  styleUrls: ['./font.component.css']
})
export class FontComponent implements OnInit {
  @Input() font:any
  constructor() { }

  ngOnInit() {
  }


}
