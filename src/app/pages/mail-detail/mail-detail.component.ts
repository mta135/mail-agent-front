import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MailService } from '../../services/mail.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mail-detail',
  imports: [DatePipe],
  templateUrl: './mail-detail.component.html',
  styleUrl: './mail-detail.component.css'
})
export class MailDetailComponent {


  private route = inject(ActivatedRoute);
  private router = inject(Router);
  mailService = inject(MailService);

  mailId = this.route.snapshot.paramMap.get('id');

  mail = computed(() =>
    this.mailService.mails().find(m => m.id === this.mailId)
  );

  goBack(): void {
    this.router.navigate(['/inbox']);
  }

}
