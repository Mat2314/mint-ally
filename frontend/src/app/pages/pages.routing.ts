import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from '@pages/components/contact/contact-page/contact-page.component';
import { DashboardPageComponent } from '@pages/components/dashboard/dashboard-page/dashboard-page.component';
import { FaqPageComponent } from '@pages/components/faq/faq-page/faq-page.component';
import { HowAreYouPageComponent } from '@pages/components/how-are-you/how-are-you-page/how-are-you-page.component';
import { NavigationComponent } from '@pages/components/navigation/navigation/navigation.component';
import { PageNotFoundComponent } from '@pages/components/page-not-found/page-not-found/page-not-found.component';
import { SettingsPageComponent } from '@pages/components/settings/settings-page/settings-page.component';
import { WelcomePageComponent } from '@pages/components/welcome/welcome-page/welcome-page.component';
import { BlogArticlePageComponent } from './components/blog-article-page/blog-article-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'welcome', component: WelcomePageComponent },
    {
        path: 'nav', component: NavigationComponent, children: [
            { path: 'dashboard', component: DashboardPageComponent },
            { path: 'how-are-you', component: HowAreYouPageComponent },
            { path: 'blog', component: FaqPageComponent },
            { path: 'blog/:id', component: BlogArticlePageComponent },
            { path: 'contact', component: ContactPageComponent },
            { path: 'settings', component: SettingsPageComponent },
        ]
    },
    { path: '**', component: PageNotFoundComponent },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
