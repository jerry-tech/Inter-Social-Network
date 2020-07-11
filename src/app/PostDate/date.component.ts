import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-date',
  
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
  @Input() postdate : any;
  currentdate: string;
  dbdate: string;
  month: number;
  finalDbDate: string;

  firstDate: any;
  secondDate: any;
  currentTime: string;
  parsedDbDate: any;
  parsedCurrentDate: any;
  monthDiff: number;
  yearDiff: number;
  angularYear: number;
  angularMonth: number;
  angularMinutes: number;
  angularHours: number;
  angularSeconds: number;
  angularDays: number;
  jj: any;
  constructor() { }

  ngOnInit() {
  }

  calculateDate(dateCreated: string): any {
    let monthIndex;
    let monthAbbValue;

    const date = new Date();
    this.dbdate = dateCreated;

    // console.log(dateCreated);

    const dbYear = this.dbdate.trim().substring(0, 4);
    const dbMonth = this.dbdate.trim().substring(5, 7);
    const dbDay = this.dbdate.trim().substring(8, 10);
    const dbTime = this.dbdate.trim().substring(11);

    // console.log("the db time is : " + dbTime);

    let dbHour = dbTime.trim().substring(0,2);
    
    let dbMinutes = dbTime.trim().substring(3,5);
  
    let dbSeconds = dbTime.trim().substring(6,8);

    const time = parseInt(dbHour)+ 1 + ":" + dbMinutes + ":" + dbSeconds;
    
    // getting current date in js
    this.month = parseInt(date.getMonth().toString()) + 1;


    //----------------------------------------------------
    //getting time
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hour = date.getHours() ;

    this.currentTime = hour + ":" + minutes + ":" + seconds;

    this.firstDate = this.currentDateAbb(this.month) + " " + date.getDate().toString() + ", " +
      date.getFullYear().toString() + " " + this.currentTime;
    console.log(this.firstDate);

    /*second date time */
    this.secondDate = this.dataDateAbb(dbMonth) + " " + dbDay + ", " +
      dbYear + " " + time;
    // console.log(this.secondDate);

    this.parsedCurrentDate = new Date(this.firstDate);
    // console.log("" + this.firstDate);

    this.parsedDbDate = new Date(this.secondDate);
    // console.log("<br>" + this.secondDate);

    var res = Math.abs(this.parsedCurrentDate - this.parsedDbDate) / 1000;

    // get total days between two dates
    var days = Math.floor(res / 86400);
    this.angularDays = days;

    // get hours        
    var hours = Math.floor(res / 3600) % 24;
    this.angularHours = hours ;

    // get minutes
    var minutes = Math.floor(res / 60) % 60;
    this.angularMinutes = minutes;

    // get seconds
    var seconds = res % 60;
    this.angularSeconds = seconds;


    //getting month difference
    this.angularMonth = this.dateMonthCal(this.parsedDbDate, this.parsedCurrentDate);


    //getting year difference
    this.angularYear = this.dateYearCal(this.parsedDbDate, this.parsedCurrentDate);
    // console.log(this.angularSeconds + " Seconds");
    // console.log(this.angularMinutes + " Minutes");
    // console.log(this.angularHours +" Hour");
    // console.log(this.angularDays);
    // console.log(this.angularMonth);
    // console.log(this.angularYear);

    if (this.angularYear > 0 && this.angularMonth < 13) {

      if (this.angularYear >= 1) {
        return this.angularYear + " Years ago";
      } else {
        return this.angularYear + " Year ago";
      }
    } else if (this.angularMonth >= 1 && (this.angularDays >= 31 || this.angularDays >= 30 || this.angularDays >= 29 || this.angularDays >= 28)) {

      if (this.angularMonth > 1) {
        return this.angularMonth + " Months ago";
      } else {
        return this.angularMonth + " Month ago";
      }
    } else if (this.angularDays >= 1 && this.angularHours < 23 && this.angularMinutes < 59) {
      if (this.angularDays > 1) {
        return this.angularDays + " Days ago";
      } else {
        return this.angularDays + " Day ago";
      }
    } else if (this.angularHours >= 1 && this.angularMinutes < 59 && this.angularSeconds < 59 && this.angularDays < 1) {
      if (this.angularHours > 1) {
        return this.angularHours + " Hours ago";
      } else {
        return this.angularHours + " Hour ago";
      }

    } else if (this.angularMinutes >= 1 && this.angularSeconds < 59 && this.angularHours <= 1) {
      if (this.angularMinutes > 1) {
        return this.angularMinutes + " Minutes ago";
      } else {
        return this.angularMinutes + " Minute ago";
      }

    } else if (this.angularSeconds < 60 && this.angularMinutes < 1 && this.angularHours < 1) {

      if (this.angularSeconds > 1) {
        return this.angularSeconds + " Seconds ago";
      } else {
        return this.angularSeconds + " Second ago";
      }
    }



  }
  //method used to get current month abbreviation
  currentDateAbb(value: number) {
    let monthAbbValue;
    const monthAbb = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec"];

    monthAbbValue = monthAbb[value - 1];

    return monthAbbValue;

  }

  //method used to get Database  month abbreviation
  dataDateAbb(value: string) {
    let dbmonthValue;
    const monthAbb = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec"];

    if (parseInt(value) > 9) {
      dbmonthValue = monthAbb[parseInt(value) - 1];
    } else {
      let realMonth = value.charAt(1);
      dbmonthValue = monthAbb[parseInt(realMonth) - 1];
    }

    return dbmonthValue;
  }
  //method used to calculate month difference
  dateMonthCal(secondDate: any, firstDate: any) {
    var diff = (secondDate.getTime() - firstDate.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7 * 4);
    this.monthDiff = Math.abs(Math.round(diff));

    return this.monthDiff;
  }

  //method used to calculate Year difference
  dateYearCal(secondDate: any, firstDate: any) {
    var diff = (secondDate.getTime() - firstDate.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    this.yearDiff = Math.abs(Math.round(diff / 365.25));

    return this.yearDiff;
  }


}
