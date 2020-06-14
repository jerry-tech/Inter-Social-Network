import { Component, OnInit } from '@angular/core';
import { FeedsService } from '../shared/feeds.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DataService } from '../Users/data.service';

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confpasswordControl = c.get('confpassword');

  if (passwordControl.value === confpasswordControl.value) {
    return null;
  }
  return { 'match': true };
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  flaggedPost: any;
  adminRegister: FormGroup;
  previewImage: string | ArrayBuffer;
  selectedImage: File;
  allUsers: any;
  errorMessage: any;
  isLoading: boolean;
  activeusers: boolean;
  account: boolean;
  rightcont: boolean;
  errorAdmin: boolean;
  clickAdmin: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService, private feedService: FeedsService, private fb: FormBuilder) { }

  allJobs = [
    'Admin', 'Counter Officer', 'Cleaner', 'Driver', 'Mechanic'
  ]
  ngOnInit() {

    this.rightcont = true;
    this.account = true;
    this.activeusers = false;
    this.errorAdmin = false;
    this.clickAdmin = false;

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.isLoading = true; //loading spinner

      //subscribing to method used to get all flagged posts
      this.feedService.getFlagged().subscribe(
        res => {
          this.isLoading = false; //loading spinner

          this.feedService.myFlag.next(res.data);
          // console.log(res.data);
        },
        err => {
          this.isLoading = true;
        }
      )
    })

    //subscribing to the behavioural subject
    this.feedService.myFlag.subscribe(flagged => {
      this.flaggedPost = flagged;
    });


    //subscribing to the get all users method
    this.feedService.getAllUsers().subscribe(
      res => {
        this.isLoading = false; //loading spinner
        this.feedService.myUser.next(res);
        // console.log(this.allUsers);
      },
      err => {}
    )

     //subscribing to the behavioural subject of getting all users
     this.feedService.myUser.subscribe(user => {
      this.allUsers = user;
    });


    //reative form validations 
    this.adminRegister = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],//any time more than one validation is written be sure to put it in an array unless it will throw [ validator to return Promise or Observable]
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],

      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confpassword: ['', [Validators.required, Validators.minLength(6)]],
      }, { validator: passwordMatcher }),

      gender: ['', Validators.required],
      jobrole: ['', Validators.required],
      dept: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(5)]],
      userImage: ['', Validators.required],
    })
  }

  //check if a post is flagged
  isChecked(flag) {
    let valid = true;
    if (flag != 't') {
      valid = false;
    }
    return valid;
  }


  //image preview
  onImagePicked(event: Event) {
    const file = <File>(event.target as HTMLInputElement).files[0];
    this.adminRegister.patchValue({ userImage: file });
    this.adminRegister.get('userImage').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result;
    };
    reader.readAsDataURL(file);
    this.selectedImage = file;
  }

  //to submit form
  save() {
    this.isLoading = true; //loading spinner
    this.feedService.registerUsers(this.adminRegister.value.firstName, this.adminRegister.value.lastName,
      this.adminRegister.value.email, this.adminRegister.controls['passwordGroup'].value.password, this.adminRegister.value.gender,
      this.adminRegister.value.jobrole, this.adminRegister.value.dept, this.adminRegister.value.address, this.selectedImage).subscribe(
        res => {
          if (res.status === 'success') {
            this.isLoading = false; //loading spinner
            this.clickAdmin = true; // enabling the modal
            this.successForm();//method used to set time out for the modal
            this.adminRegister.reset();//resetting the admin reg form
            this.feedService.updateUsers();//updating the users list
            ;
          } else {
            this.isLoading = false;//loading spinner
            this.errorAdmin = true;// enabling the modal
            this.errorForm();//method used to set time out for the modal
          }

        },
        err => {
          this.isLoading = false;
          this.errorAdmin = true;
          this.errorForm();
        }
      )
    // console.log(this.adminRegister.value.gender);
  }

  //radio button toggle values using reative form set method
  setGender(gender: string): void {
    const genderControl = this.adminRegister.get('gender');

    if (gender === 'Male') {
      genderControl.setValidators(Validators.required);
    } else {
      genderControl.clearValidators();
    }

    genderControl.updateValueAndValidity();
  }

  public toggleLinks() {
    this.rightcont = false;
    this.account = true;
    this.activeusers = false;
  }
  public togglePost() {
    this.rightcont = true;
    this.account = false;
    this.activeusers = false;
  }
  toggleUser() {
    this.rightcont = false;
    this.account = false;
    this.activeusers = true;
  }
  toggleRegForm() {
    this.rightcont = true;
    this.account = true;
    this.activeusers = false;
  }
  errorForm() {
    setTimeout(function () {
      this.errorAdmin = false;
    }.bind(this), 5000);
  }
  successForm() {
    setTimeout(function () {
      this.clickAdmin = false;
    }.bind(this), 5000);
  }
  formResponse = [{
    fontawesome: "fa fa-check-circle",
    message: "User Account Created Successfully"
  }]

  errorData = [{
    fontawesome: "fa fa-times-circle",
    message: "Email Address Already Exist or Error Creating Account"
  }]



}
