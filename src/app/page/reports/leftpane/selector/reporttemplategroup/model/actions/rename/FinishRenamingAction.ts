import AbstractReportTemplateGroupSelectorAction from '../AbstractReportTemplateGroupSelectorAction';
import { ReportTemplateGroupSelectorState } from '../../state/ReportTemplateGroupSelectorState';
import { ReportTemplateGroup } from '../../../../../../model/state/types/ReportTemplateGroup';

export default class FinishRenamingAction extends AbstractReportTemplateGroupSelectorAction {
  constructor(private readonly reportTemplateGroup: ReportTemplateGroup, private readonly newName: string) {
    super();
  }

  perform(currentState: ReportTemplateGroupSelectorState): ReportTemplateGroupSelectorState {
    // this.dispatch(new RenameDashboardGroupAction(this.dashboardGroup, this.newName));

    return {
      ...currentState,
      reportTemplateGroupToBeRenamed: undefined
    };
  }
}
