import AbstractReportTemplateGroupSelectorAction from './AbstractReportTemplateGroupSelectorAction';
import { ReportTemplateGroup } from '../../../../model/state/types/ReportTemplateGroup';
import { ReportTemplateGroupSelectorState } from '../state/ReportTemplateGroupSelectorState';

export default class SelectAction extends AbstractReportTemplateGroupSelectorAction {
  constructor(private readonly reportTemplateGroup: ReportTemplateGroup) {
    super();
  }

  perform(currentState: ReportTemplateGroupSelectorState): ReportTemplateGroupSelectorState {
    return {
      ...currentState,
      selectedReportTemplateGroup: this.reportTemplateGroup
    };
  }
}
