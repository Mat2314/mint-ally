import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/services/authentication.service';
import { LogService } from '@core/services/log.service';
import { SnackBarService } from '@core/services/snack-bar.service';
import { ResetPasswordDialogComponent } from '@features/login-form/dialogs/reset-password-dialog/reset-password-dialog.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  })

  constructor(private authService: AuthenticationService,
    private logService: LogService,
    private router: Router,
    private dialog: MatDialog,
    private snackBarService: SnackBarService) { }


  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.loginForm.getRawValue()).subscribe(
      res => {
        this.snackBarService.showSnackBar("It's great to see you again!");
        this.router.navigate(['/nav/dashboard']);
      }, err => {
        this.logService.log(err);
      }
    );
  }

  resetPasswordDialog() {
    this.dialog.open(ResetPasswordDialogComponent, {});
  }

}
