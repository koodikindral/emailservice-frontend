export interface TestEmailTemplateModel {
  id?: number;
  email?: string;
  tags?: string;
  bodyHtml?: string;
  originalHtml?: string;
}

export class TestEmailTemplate implements TestEmailTemplateModel {
  constructor(
    public id?: number,
    public email?: string,
    public tags?: any,
    public bodyHtml?: any,
    public originalHtml?: any,
  ) {  }
}
