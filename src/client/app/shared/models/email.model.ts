export interface EmailTemplateModel {
  id?: number;
  code?: string;
  bodyText?: string;
  bodyHtml?: string;
}

export class EmailTemplate implements EmailTemplateModel {
  constructor(
    public id?: number,
    public code?: string,
    public bodyText?: string,
    public bodyHtml?: string
  ) {  }
}
