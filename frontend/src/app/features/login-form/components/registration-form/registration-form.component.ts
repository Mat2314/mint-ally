import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/services/authentication.service';
import { HttpService } from '@core/services/http.service';
import { LogService } from '@core/services/log.service';
import { SnackBarService } from '@core/services/snack-bar.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  public registrationForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone_number: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    repeat_password: new FormControl(null, [Validators.required])
  })

  constructor(private authService: AuthenticationService,
    private logService: LogService,
    private httpService: HttpService,
    private router: Router,
    private dialog: MatDialog,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
  }

  register() {
    this.httpService.httpPost('core/registration/', this.registrationForm.getRawValue()).subscribe(
      res => {
        this.logService.log(res);
        this.snackBarService.showSnackBar(res.message);
        this.registrationForm.reset();
      }, err => {
        this.logService.log(err);
        this.snackBarService.showSnackBar(err.error.message);
      }
    );
  }

}
