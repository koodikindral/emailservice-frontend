import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmailService } from '../shared/models/index';
import { ModalModule } from 'ng2-bootstrap/modal';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, SharedModule, ModalModule.forRoot(), CKEditorModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [EmailService]
})
export class HomeModule { }
