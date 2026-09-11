// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { InboxComponent } from '../pages/inbox/inbox.component';

// import { MailDetailComponent } from '../components/mail-detail/mail-detail.component';

import { MailDetailComponent } from '../pages/mail-detail/mail-detail.component';


export const routes: Routes = [
    { path: '', redirectTo: 'inbox', pathMatch: 'full' },
    { path: 'inbox', component: InboxComponent },
    { path: 'mail/:id', component: MailDetailComponent },
];