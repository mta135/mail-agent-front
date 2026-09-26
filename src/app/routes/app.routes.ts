// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { InboxComponent } from '../pages/inbox/inbox.component';

// import { MailDetailComponent } from '../components/mail-detail/mail-detail.component';

import { MailDetailComponent } from '../pages/mail-detail/mail-detail.component';
import { LoginComponent } from '../pages/login/login.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'inbox', pathMatch: 'full' },
    { path: 'inbox', component: InboxComponent },
    { path: 'mail/:id', component: MailDetailComponent },
];