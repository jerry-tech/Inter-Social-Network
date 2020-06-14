import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare const myTest: any;


@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  @Input() response: any;

  constructor(private router: Router) { }

  ngOnInit() {
   
  }

  zz(){
    myTest();
  }



}
