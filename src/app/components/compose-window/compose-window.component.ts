import { Component, inject, signal } from '@angular/core';
import { ComposeService } from '../../services/compose.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-compose-window',
  imports: [FormsModule],
  templateUrl: './compose-window.component.html',
  styleUrl: './compose-window.component.css'
})
export class ComposeWindowComponent {
  composeService = inject(ComposeService);
  attachments = signal<File[]>([]);

  recipients = signal<string[]>([]);
  currentRecipientInput = signal<string>('');

  addRecipient(): void {
    const value = this.currentRecipientInput().trim().replace(/,$/, '');

    if (value.length === 0) {
      return;
    }

    // evită duplicate
    if (!this.recipients().includes(value)) {
      this.recipients.update(current => [...current, value]);
    }

    this.currentRecipientInput.set('');
  }

  onRecipientKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.addRecipient();
    }

    if (event.key === 'Backspace' && this.currentRecipientInput() === '') {
      // șterge ultimul chip dacă input-ul e gol și apeși Backspace
      this.recipients.update(current => current.slice(0, -1));
    }
  }

  removeRecipient(index: number): void {
    this.recipients.update(current => current.filter((_, i) => i !== index));
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);
      this.attachments.update(current => [...current, ...newFiles]);
    }
    input.value = '';
  }

  removeAttachment(index: number): void {
    this.attachments.update(current => current.filter((_, i) => i !== index));
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

}
