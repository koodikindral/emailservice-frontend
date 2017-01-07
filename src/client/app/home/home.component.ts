import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailService, EmailTemplate, TestEmailTemplate } from '../shared/index';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
  @ViewChild('templateModal') public templateModal: ModalDirective;
  @ViewChild('confirmModal') public confirmModal: ModalDirective;
  @ViewChild('testModal') public testModal: ModalDirective;

  errorMessage: string;
  templates: Array<EmailTemplate> = [];
  template: EmailTemplate;
  testEmailTemplate: TestEmailTemplate;
  id: number = null;

  constructor(public emailService: EmailService) {
    this.template = new EmailTemplate();
    this.testEmailTemplate = new TestEmailTemplate();
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
        () => this.templateModal.show()
      );
  }

  deleteTemplate() {
    this.emailService.deleteTemplate(this.id)
      .subscribe(
        template => this.getTemplates(),
        error => this.errorMessage = <any>error,
        () => this.confirmModal.hide()
      );
  }

  addTemplate() {
    this.template = new EmailTemplate();
    this.templateModal.show();
  }

  saveTemplate() {
    if (this.template.id) {
      this.emailService.editTemplate(this.template)
        .subscribe(
          template => this.getTemplates(),
          error => this.errorMessage = <any>error,
          () => this.templateModal.hide()
        );
    } else {
      this.emailService.addTemplate(this.template)
        .subscribe(
          template => this.getTemplates(),
          error => this.errorMessage = <any>error,
          () => this.templateModal.hide()
        );
    }
    return false;
  }

  testTemplate(id?: number) {
    if (id) {
      var tags: any = { 'name': 'KOODIKINDRAL' };
      this.emailService.getTemplate(id)
        .subscribe(
          template => this.setTestTemplate(template, id),
          error => this.errorMessage = <any>error,
          () => this.testModal.show()
        );
    } else {
      this.emailService.testTemplate(this.testEmailTemplate)
        .subscribe(
          template => this.testModal.hide(),
          error => this.errorMessage = <any>error,
          () => this.testModal.hide()
        );
    }
    return false;
  }

  setTestTemplate(template: any, id: number) {
    let tags: any = { 'name': 'KOODIKINDRAL' };
    this.testEmailTemplate =
      new TestEmailTemplate(id,
        'gert.vesterberg@gmail.com',
        JSON.stringify(tags, null, '\t'),
        this.replaceTags(<any>template['bodyHtml'], tags),
        template['bodyHtml']);
  }

  tagsChanged() {
    try {
      this.testEmailTemplate.bodyHtml = this.replaceTags(this.testEmailTemplate.originalHtml, JSON.parse(this.testEmailTemplate.tags));
    } catch(err) { console.log(err); }
  }

  replaceTags(html: string, tags: any) {
    try {
      Object.keys(tags).map((key) => {
        html = html.replace(`$${key}$`, tags[key]);
      });
    } catch(err) { console.log(err); }
    return html;
  }
}
