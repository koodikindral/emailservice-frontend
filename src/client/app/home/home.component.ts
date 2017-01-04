import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailService } from '../shared/index';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  errorMessage: string;
  templates: Array<any> = [];
  template: any;

  constructor(public emailService: EmailService) {}

  ngOnInit() {
    this.getTemplates();
  }

  getTemplates() {
    this.emailService.getAllTemplates()
      .subscribe(
        templates => this.templates = templates,
        error => this.errorMessage = <any>error
      );
  }

  editTemplate(id: number) {
    this.emailService.getTemplate(id)
      .subscribe(
        template => this.template = template,
        error => this.errorMessage = <any>error,
        () => this.modal.show()
      );
  }

  addTemplate() {
    this.template = null;
    this.modal.show();
  }

  saveTemplate() {

  }
}
