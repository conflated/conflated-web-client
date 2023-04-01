import AbstractReportTemplateGroupSelectorAction from '../AbstractReportTemplateGroupSelectorAction';
import { ReportTemplateGroupSelectorState } from '../../state/ReportTemplateGroupSelectorState';
import { ReportTemplateGroup } from '../../../../../../model/state/types/ReportTemplateGroup';

export default class ConfirmDeleteAction extends AbstractReportTemplateGroupSelectorAction {
  constructor(private readonly reportTemplateGroup?: ReportTemplateGroup) {
    super();
  }

  perform(currentState: ReportTemplateGroupSelectorState): ReportTemplateGroupSelectorState {
    // this.dispatch(new RemoveDashboardGroupAction(this.dashboardGroup));

    return {
      ...currentState,
      reportTemplateGroupToBeDeleted: undefined
    };
  }
}
