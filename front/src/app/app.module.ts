import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/layout/layout.component';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';

import { httpErrorInterceptorProviders } from './interceptors/http-error.interceptor';
import { jwtInterceptorProviders } from './interceptors/jwt.interceptor';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,

    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [
    httpErrorInterceptorProviders,
    jwtInterceptorProviders,
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
