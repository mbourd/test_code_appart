import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'shared-component-notification-basic',
  templateUrl: './notif-basic.component.html',
  styleUrls: ['./notif-basic.component.scss'],
})
export class NotifBasicComponent implements OnInit {
  @ViewChild('myTemplateNotif', { static: true })
  myTemplateNotif?: TemplateRef<any>;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.addTemplate('myTemplateNotif', this.myTemplateNotif!);
  }
}
