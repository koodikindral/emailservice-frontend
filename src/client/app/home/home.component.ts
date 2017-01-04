import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailService, EmailTemplate } from '../shared/index';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @ViewChild('confirm') public confirm: ModalDirective;

  errorMessage: string;
  templates: Array<EmailTemplate> = [];
  template: EmailTemplate;
  deleteId: number = null;

  constructor(public emailService: EmailService) {
    this.template = new EmailTemplate();
    console.log(this.template);
  }

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

  deleteTemplate() {
    this.emailService.deleteTemplate(this.deleteId)
      .subscribe(
        template => this.getTemplates(),
        error => this.errorMessage = <any>error,
        () => this.confirm.hide()
      );
  }

  addTemplate() {
    this.template = new EmailTemplate();
    this.modal.show();
  }

  saveTemplate() {
    if (this.template.id) {
      this.emailService.editTemplate(this.template)
        .subscribe(
          template => this.getTemplates(),
          error => this.errorMessage = <any>error,
          () => this.modal.hide()
        );
    } else {
      this.emailService.addTemplate(this.template)
        .subscribe(
          template => this.getTemplates(),
          error => this.errorMessage = <any>error,
          () => this.modal.hide()
        );
    }
  }

  testTemplate(id: number) {
    this.emailService.testTemplate(id)
      .subscribe(
        template => this.getTemplates(),
        error => this.errorMessage = <any>error,
        () => this.modal.hide()
      );
  }
}
