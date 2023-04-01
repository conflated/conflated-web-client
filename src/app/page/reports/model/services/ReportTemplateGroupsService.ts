import { ReportTemplateGroup } from '../state/types/ReportTemplateGroup';

export interface ReportTemplateGroupsService {
  fetchReportTemplateGroups(): Promise<ReportTemplateGroup[]>;
}
