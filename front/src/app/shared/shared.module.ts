import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzListModule } from 'ng-zorro-antd/list';

import { NotifBasicComponent } from './template/notification/notif-basic/notif-basic.component';
import { FormValidatorComponent } from './form/form-validator/form-validator.component';
import { AnonymousRegisterComponent } from '../pages/anonymous/anonymous-register/anonymous-register.component';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);

const modules: any[] = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  NgbModule,

  NzLayoutModule,
  NzNotificationModule,
  NzIconModule,
  NzButtonModule,
  NzTagModule,
  NzFormModule,
  NzInputModule,
  NzSelectModule,
  NzCardModule,
  NzAvatarModule,
  NzListModule,
];

const components: any[] = [NotifBasicComponent, FormValidatorComponent, AnonymousRegisterComponent];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...modules, ...components],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class SharedModule {}
