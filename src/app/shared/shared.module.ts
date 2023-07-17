import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthHeaderComponent } from './auth-header/auth-header.component';
import { NotifyComponent } from './notify/notify.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component'; // needed for routerLink to work properly in this module
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from './admin-header/admin-header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AuthHeaderComponent,
    NotifyComponent,
    LoadingSpinnerComponent,
    AdminHeaderComponent,
  ],
  imports: [CommonModule, RouterModule,FormsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    AuthHeaderComponent,
    NotifyComponent,
    LoadingSpinnerComponent,
    AdminHeaderComponent
  ],
})
export class SharedModule {}
