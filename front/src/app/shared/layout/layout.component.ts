import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/services/auth.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(
    public sessionService: SessionstorageService,
    private authService: AuthService,
    private nzNotification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  deconnexion(): void {
    this.nzNotification.info('', 'Déconnexion en cours...');
    this.authService.logout().subscribe({
      next: () => {
        this.sessionService.clean();
        this.router.navigate(['/auth/login']);
      },
      complete: () => this.nzNotification.success('', 'Deconnecté'),
    });
  }
}
