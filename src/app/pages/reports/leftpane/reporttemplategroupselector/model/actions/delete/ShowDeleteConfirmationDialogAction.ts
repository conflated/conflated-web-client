import AbstractReportTemplateGroupSelectorAction from '../AbstractReportTemplateGroupSelectorAction';
import { ReportTemplateGroupSelectorState } from '../../state/ReportTemplateGroupSelectorState';
import { DashboardGroup } from '../../../../../model/state/types/DashboardGroup';

export default class ShowDeleteConfirmationDialogAction extends AbstractReportTemplateGroupSelectorAction {
  constructor(private readonly dashboardGroup: DashboardGroup) {
    super();
  }

  perform(currentState: ReportTemplateGroupSelectorState): ReportTemplateGroupSelectorState {
    return {
      ...currentState,
      dashboardGroupToBeDeleted: this.dashboardGroup
    };
  }
}
