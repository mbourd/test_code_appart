import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/services/auth.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-anonymous-login',
  templateUrl: './anonymous-login.component.html',
  styleUrls: ['./anonymous-login.component.scss'],
})
export class AnonymousLoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private sessionService: SessionstorageService,
    private router: Router,
    private nzNotificationService: NzNotificationService
  ) {
    this.form = fb.group({});
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
      },
      {}
    );
  }

  onSubmit(): void {
    const { username, password } = this.form.value;

    if (this.form.valid) {
      // console.log('submit', this.form.value);
      this.nzNotificationService.info('', 'Connexion en cours...');

      this.authService.login(username, password).subscribe({
        next: (data) => {
          this.sessionService.saveUser(data);
          // console.log(this.sessionService.getUser());
          this.router.navigate(['/pangolin/profile']);
        },
        complete: () => {
          this.nzNotificationService.success('', 'Connecté !');
        }
      });
    } else {
      [].forEach.call(Object.values(this.form.controls), (control: AbstractControl<any, any>) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      // Object.values(this.form.controls).forEach(control => {
      //   if (control.invalid) {
      //     control.markAsDirty();
      //     control.updateValueAndValidity({ onlySelf: true });
      //   }
      // });
    }
  }
}
