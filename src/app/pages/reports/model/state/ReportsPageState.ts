import { ReportTemplateGroup } from './types/ReportTemplateGroup';

export type ReportsPageState = {
  readonly reportTemplateGroups: ReportTemplateGroup[];
  readonly isFetchingReportTemplateGroups: boolean;
};
