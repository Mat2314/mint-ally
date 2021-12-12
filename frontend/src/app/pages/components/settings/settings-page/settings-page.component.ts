import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '@core/services/http.service';
import { LogService } from '@core/services/log.service';
import { SnackBarService } from '@core/services/snack-bar.service';
import { AddHelpContactDialogComponent } from '@features/add-help-contact-form/components/add-help-contact-dialog/add-help-contact-dialog.component';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export interface ContactPerson {
  first_name: string;
  last_name: string;
  phone_number: string;
}
@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  faEdit = faEdit;

  public notificationsOn: boolean = false;

  public contactsList: Array<ContactPerson> = [];
  displayedColumns: string[] = ['first_name', 'last_name', 'phone_number', 'details'];
  dataSource = new MatTableDataSource<ContactPerson>();

  constructor(private logService: LogService,
    private snackBarService: SnackBarService,
    private httpService: HttpService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getHelpContacts();
  }

  getUserData() {
    this.httpService.httpGet('core/whoami/').subscribe(
      res => {
        this.logService.log(res);
        this.notificationsOn = res.notifications_on;
      }, err => {
        this.logService.log(err);
      }
    );
  }

  toggleNotifications() {
    this.notificationsOn = !this.notificationsOn;

    this.httpService.httpPut('core/whoami/', { "notifications_on": this.notificationsOn }).subscribe(
      res => {
        this.logService.log(res);
      }, err => {
        this.logService.log(err);
      }
    );
  }

  getHelpContacts() {
    this.httpService.httpGet('contacts/all/').subscribe(
      res => {
        this.logService.log(res);
        this.contactsList = res.contacts;
        this.dataSource.data = this.contactsList;
      }, err => {
        this.logService.log(err);
      }
    );
  }

  editContactDialog(user: ContactPerson) {
    this.dialog.open(AddHelpContactDialogComponent, {
      data: {
        mode: 'edit',
        userData: user
      }
    }).afterClosed().subscribe(
      res => {
        if (res.reload) {
          this.getHelpContacts();
        }
      }
    );

  }

  addNewContactDialog() {
    this.dialog.open(AddHelpContactDialogComponent, {
      data: {
        mode: 'add',
        userData: null
      }
    }).afterClosed().subscribe(
      res => {
        if (res.reload) {
          this.getHelpContacts();
        }
      }
    );
  }

}
