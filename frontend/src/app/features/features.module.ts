import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormModule } from './login-form/login-form.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { MoodFormModule } from './mood-form/mood-form.module';
import { MessageCardModule } from './message-card/message-card.module';
import { BlogModule } from './blog/blog.module';
import { AddHelpContactFormModule } from './add-help-contact-form/add-help-contact-form.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LoginFormModule,
    MenuItemModule,
    MoodFormModule,
    MessageCardModule,
    BlogModule,
    AddHelpContactFormModule
  ],
  exports: [
    LoginFormModule,
    MenuItemModule,
    MoodFormModule,
    MessageCardModule,
    BlogModule,
    AddHelpContactFormModule
  ]
})
export class FeaturesModule { }
