import { Component, OnInit } from '@angular/core';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-pangolin-show',
  templateUrl: './pangolin-show.component.html',
  styleUrls: ['./pangolin-show.component.scss'],
})
export class PangolinShowComponent implements OnInit {
  username: string = '';
  role: string = '';

  constructor(private sessionService: SessionstorageService) {}

  ngOnInit(): void {
    this.username = this.sessionService.getUser()['username'];
    this.role = this.sessionService.getUser()['roles'][0].name;
  }
}
