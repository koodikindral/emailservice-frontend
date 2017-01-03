import { Component, OnInit } from '@angular/core';
import { EmailService } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {

  errorMessage: string;
  templates: Array<any> = [];

  constructor(public emailService: EmailService) {}

  ngOnInit() {
    this.getTemplates();
  }

  getTemplates() {
    this.emailService.get()
      .subscribe(
        templates => this.templates = templates,
        error => this.errorMessage = <any>error
      );
  }
}
