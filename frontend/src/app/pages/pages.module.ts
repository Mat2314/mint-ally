import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './components/welcome/welcome-page/welcome-page.component';
import { DashboardPageComponent } from './components/dashboard/dashboard-page/dashboard-page.component';
import { HowAreYouPageComponent } from './components/how-are-you/how-are-you-page/how-are-you-page.component';
import { FaqPageComponent } from './components/faq/faq-page/faq-page.component';
import { ContactPageComponent } from './components/contact/contact-page/contact-page.component';
import { SettingsPageComponent } from './components/settings/settings-page/settings-page.component';
import { NavigationComponent } from './components/navigation/navigation/navigation.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found/page-not-found.component';
import { PagesRoutingModule } from './pages.routing';

@NgModule({
  declarations: [
    WelcomePageComponent,
    DashboardPageComponent,
    HowAreYouPageComponent,
    FaqPageComponent,
    ContactPageComponent,
    SettingsPageComponent,
    NavigationComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
  ]
})
export class PagesModule { }