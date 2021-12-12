import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from '@core/services/http.service';
import { LogService } from '@core/services/log.service';
import { SnackBarService } from '@core/services/snack-bar.service';

@Component({
  selector: 'app-add-help-contact-dialog',
  templateUrl: './add-help-contact-dialog.component.html',
  styleUrls: ['./add-help-contact-dialog.component.scss']
})
export class AddHelpContactDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddHelpContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private httpService: HttpService, private logService: LogService, private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close({});
  }

  onSubmitted(){
    this.dialogRef.close({reload: true});
  }

  deleteContact() {
    let httpParams = new HttpParams().set('id', this.data.userData.id);
    this.httpService.httpDelete('contacts/all/', httpParams).subscribe(
      res => {
        this.logService.log(res);
        this.snackBarService.showSnackBar(res.message);
        this.onSubmitted();
      }, err => {
        this.logService.log(err);
        this.snackBarService.showSnackBar(err.error.message);
      }
    );
  }

}
