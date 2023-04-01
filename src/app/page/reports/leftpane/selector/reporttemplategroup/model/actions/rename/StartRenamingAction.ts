import AbstractReportTemplateGroupSelectorAction from '../AbstractReportTemplateGroupSelectorAction';
import { ReportTemplateGroupSelectorState } from '../../state/ReportTemplateGroupSelectorState';
import { ReportTemplateGroup } from '../../../../../../model/state/types/ReportTemplateGroup';

export default class StartRenamingAction extends AbstractReportTemplateGroupSelectorAction {
  constructor(private readonly reportTemplateGroup: ReportTemplateGroup) {
    super();
  }

  perform(currentState: ReportTemplateGroupSelectorState): ReportTemplateGroupSelectorState {
    return {
      ...currentState,
      reportTemplateGroupToBeRenamed: this.reportTemplateGroup
    };
  }
}
