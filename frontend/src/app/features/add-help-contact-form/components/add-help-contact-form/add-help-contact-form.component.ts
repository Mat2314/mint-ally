import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '@core/services/http.service';
import { LogService } from '@core/services/log.service';
import { SnackBarService } from '@core/services/snack-bar.service';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

@Component({
  selector: 'app-add-help-contact-form',
  templateUrl: './add-help-contact-form.component.html',
  styleUrls: ['./add-help-contact-form.component.scss']
})
export class AddHelpContactFormComponent implements OnInit {

  @Output() submitted = new EventEmitter<boolean>();
  @Input() mode: string = "add"; // add | edit
  @Input() userData: any;

  public addHelpContactForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    phone_number: new FormControl(null, [Validators.required]),
  });

  constructor(
    private logService: LogService,
    private snackBarService: SnackBarService,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  initializeComponent() {
    if (this.mode === 'edit') {
      this.addHelpContactForm.setValue({
        first_name: this.userData.first_name,
        last_name: this.userData.last_name,
        phone_number: this.userData.phone_number
      });

      this.addHelpContactForm.addControl('id', new FormControl(this.userData.id, Validators.required))
    }
  }

  addContact() {
    this.httpService.httpPost('contacts/all/', this.addHelpContactForm.getRawValue()).subscribe(
      res => {
        this.logService.log(res);
        this.snackBarService.showSnackBar(res.message);
        this.submitted.emit(true);
      }, err => {
        this.logService.log(err);
        this.snackBarService.showSnackBar(err.error.message);
      }
    );
  }

  updateContact() {
    this.httpService.httpPut('contacts/all/', this.addHelpContactForm.getRawValue()).subscribe(
      res => {
        this.logService.log(res);
        this.snackBarService.showSnackBar(res.message);
        this.submitted.emit(true);
      }, err => {
        this.logService.log(err);
        this.snackBarService.showSnackBar(err.error.message);
      }
    );
  }

}
