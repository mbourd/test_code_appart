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
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const modules: any[] = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  NgbModule,
  HttpClientModule,

  TranslateModule.forRoot({
    defaultLanguage: 'fr',
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  }),

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

const components: any[] = [NotifBasicComponent, FormValidatorComponent];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...modules, ...components],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class SharedModule {}
