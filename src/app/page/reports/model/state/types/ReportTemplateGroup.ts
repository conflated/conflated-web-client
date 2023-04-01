import { ReportTemplate } from './ReportTemplate';

export type ReportTemplateGroup = {
  readonly name: string;
  readonly reportTemplates: ReportTemplate[];
};
