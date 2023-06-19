import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Pangolin } from 'src/app/models/Pangolin';
import { Role } from 'src/app/models/Role';
import { PangolinService } from 'src/app/services/pangolin.service';
import { RoleService } from 'src/app/services/role.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-pangolin-profile',
  templateUrl: './pangolin-profile.component.html',
  styleUrls: ['./pangolin-profile.component.scss'],
})
export class PangolinProfileComponent implements OnInit {
  form: FormGroup;
  isEditing: boolean = false;
  availableRoles: Role[] = [];
  isSending: boolean = false;
  pangolin: Pangolin;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionstorageService,
    private roleService: RoleService,
    private nzNotification: NzNotificationService,
    private pangolinService: PangolinService
  ) {
    this.form = fb.group({});
    this.pangolin = sessionService.getUser();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      role: [
        this.pangolin.roles[0]._id,
        [Validators.required],
      ],
    });
  }

  onClickEdit(): void {
    if (this.availableRoles.length === 0) {
      this.roleService.getAll().subscribe({
        next: (roles) => {
          this.availableRoles = roles;
        },
      });
    }

    this.isEditing = !this.isEditing;
  }

  onSubmit(): void {
    const { role } = this.form.value;

    if (this.form.valid) {
      // console.log('submit', this.form.value);

      this.isSending = true;

      this.pangolinService
        .update(this.pangolin._id, { role })
        .subscribe({
          next: (data) => {
            // console.log(data);
            this.sessionService.saveUser(data);
            this.pangolin = this.sessionService.getUser();
          },
          error: () => {
            this.isSending = false;
          },
          complete: () => {
            this.nzNotification.success('', 'Role du Pangolin modifié');
            this.isSending = false;
          },
        });
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
