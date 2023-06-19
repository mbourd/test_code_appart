import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-not-found',
  templateUrl: './error-not-found.component.html',
  styleUrls: ['./error-not-found.component.scss']
})
export class ErrorNotFoundComponent implements OnInit {
  title: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ title }) => {
      this.title = title;
    });
    this.titleService.setTitle(this.title);
  }
}
