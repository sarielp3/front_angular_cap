import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { first, debounceTime } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _success = new Subject<string>();

  public loginForm: UntypedFormGroup;
  public returnUrl!: string;
  public loading!: boolean;
  public type! : string;
  public errorMessage!: string;

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.loginForm = new UntypedFormGroup({
      userName: new UntypedFormControl('', [Validators.required, Validators.minLength(5)]),
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  public ngOnInit(): void {

    this._success.subscribe(message => this.errorMessage = message);
    this._success.pipe(debounceTime(10000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

    const currentUser = this.authenticationService.currentUserValue;

    if (currentUser != null) {
      this.router.navigate(['/']);
    }
    else {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    }
  }

  public onSubmit() {

    if (!this.loginForm.valid) {
      this.loading = false;
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginForm.controls['userName'].value, this.loginForm.controls['password'].value)
      .subscribe(
        data => {
          console.log(`${data.UserName} has logged in into system.`)
          this.loading = false;
          this.router.navigate([this.returnUrl]);
        },
        response => {

          var message = "";
          if(response.error != undefined && response.error instanceof ProgressEvent){
            message = "Error inesperado. Por favor espere, estamos trabajando en ello.";
            this.type = "danger";
          }
          else{
            message = response.error;
            this.type = "warning";            
          }

          this._success.next(message)
          this.loading = false;
          this.loginForm.setValue({
            userName: "",
            password: ""
          });
          
        });
  }
}