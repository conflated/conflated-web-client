import { ReportTemplateGroup } from '../../../../model/state/types/ReportTemplateGroup';

export type ReportTemplateGroupSelectorState = {
  readonly reportTemplateGroupToBeDeleted?: ReportTemplateGroup;
  readonly reportTemplateGroupToBeRenamed?: ReportTemplateGroup;
  readonly selectedReportTemplateGroup?: ReportTemplateGroup;
};
