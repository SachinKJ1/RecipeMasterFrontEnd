import { Component } from '@angular/core';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css'],
})
export class NotifyComponent {
  message!: string;
  color = 'green';
  constructor(private localService: LocalService) {}

  ngOnInit() {
    this.localService.messageNotification.subscribe({
      next: (res: string) => {
        this.message = res;
      },
    });

    this.localService.colorNotification.subscribe({
      next: (res: string) => {
        this.color = res;
      },
    });
  }
}
