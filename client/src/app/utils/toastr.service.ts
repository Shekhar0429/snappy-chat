import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private messageService: MessageService) {}

  showContrast(message: string) {
    this.messageService.add({
      severity: 'contrast',
      summary: 'Error',
      detail: message,
    });
  }
}
