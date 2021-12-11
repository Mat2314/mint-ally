import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormModule } from './login-form/login-form.module';
import { MenuItemModule } from './menu-item/menu-item.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginFormModule,
    MenuItemModule
  ],
  exports: [
    LoginFormModule,
    MenuItemModule
  ]
})
export class FeaturesModule { }
