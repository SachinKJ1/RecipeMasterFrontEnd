import { ChangeDetectorRef, Component } from '@angular/core';
import { LocalService } from './services/local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showNotifications = false;
  isSpinning = false;
  constructor(
    private localService: LocalService,
    private cdref: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.localService.showNotifications.subscribe({
      next: (res: boolean) => {
        this.showNotifications = res;
        setTimeout(() => {
          this.showNotifications = false;
        }, 2000);
      },
    });

    this.localService.showSpinner.subscribe({
      next: (res: boolean) => {
        this.isSpinning = res;
      },
    });
  }

  ngAfterViewChecked(){
    // to detect changes after change detection in this parent component was finished
    this.cdref.detectChanges();
  }
}
