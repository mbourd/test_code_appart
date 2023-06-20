import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Pangolin } from 'src/app/models/Pangolin';
import { Role } from 'src/app/models/Role';
import { AuthService } from 'src/app/services/auth.service';
import { PangolinService } from 'src/app/services/pangolin.service';
import { RoleService } from 'src/app/services/role.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';
import { FormValidators } from 'src/app/shared/form/form.validators';

@Component({
  selector: 'app-anonymous-register',
  templateUrl: './anonymous-register.component.html',
  styleUrls: ['./anonymous-register.component.scss'],
})
export class AnonymousRegisterComponent implements OnInit {
  @Input() inputAllPangolinsNotFriend: Pangolin[] | null | undefined;
  @Output() outputAllPangolinsNotFriend: EventEmitter<Pangolin[]> = new EventEmitter<Pangolin[]>();
  @Output() outputPangolin: EventEmitter<Pangolin> = new EventEmitter<Pangolin>();

  form: FormGroup;
  availableRoles: Role[] = [];
  isSending: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private nzNotificationService: NzNotificationService,
    private roleService: RoleService,
    private pangolineService: PangolinService,
    private sessionService:SessionstorageService,
  ) {
    this.form = fb.group({});
  }

  ngOnInit(): void {
    this.roleService.getAll().subscribe({
      next: (roles) => {
        this.availableRoles = roles;
      }
    });

    this.form = this.fb.group(
      {
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
        password2: [null, [Validators.required]],
        role: [null, [Validators.required]],
      },
      {
        validators: [
          FormValidators.confirmPassword('password', 'password2')
        ]
      } as AbstractControlOptions
    );
  }

  onSubmit(): void {
    const { username, password, role } = this.form.value;

    if (this.form.valid) {
      // console.log('submit', this.form.value);
      this.isSending = true;
      this.nzNotificationService.info('', 'Inscription en cours...');
      this.authService.register(username, password, [role], this.inputAllPangolinsNotFriend ? true : false).subscribe({
        next: async (d:any) => {
          this.form.reset();
          if (d instanceof Object) {
            this.sessionService.saveUser(d);
            this.outputAllPangolinsNotFriend.emit(await this.pangolineService.updateAllPangolinNotFriend(this.sessionService.getUser()));
            this.outputPangolin.emit(this.sessionService.getUser());
          }
        },
        error: () => {
          this.isSending = false;
        },
        complete: () => {
          this.nzNotificationService.success('', 'Pangolin inscrit');
          this.isSending = false;
        }
      })
    } else {
      [].forEach.call(
        Object.values(this.form.controls),
        (control: AbstractControl<any, any>) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        }
      );
    }
  }
}
