import type { SaveAsDashboardOrReportTemplateDialogState } from '../state/SaveAsDashboardOrReportTemplateDialogState';
import AbstractSaveAsDashboardOrReportTemplateDialogAction from './AbstractSaveAsDashboardOrReportTemplateDialogAction';
import Utils from '../../../../../../common/utils/Utils';
import AddDashboardGroupAction from '../../../../../dashboards/model/actions/add/AddDashboardGroupAction';
import AddDashboardToDashboardGroupAction from '../../../../../dashboards/model/actions/add/AddDashboardToDashboardGroupAction';
import CloseSaveAsDashboardOrReportTemplateDialogAction from './CloseSaveAsDashboardOrReportTemplateDialogAction';
import ShowSavedSuccessfullyNotificationAction from './ShowSavedSuccessfullyNotificationAction';
import { DashboardGroup } from '../../../../../dashboards/model/state/types/DashboardGroup';
import { Dashboard } from '../../../../../dashboards/model/state/types/Dashboard';

export default class SaveDashboardAction extends AbstractSaveAsDashboardOrReportTemplateDialogAction {
  constructor(
    private readonly dashboardGroupName: string,
    private readonly dashboardName: string,
    private readonly dashboardGroups: DashboardGroup[],
    private readonly dashboard: Dashboard
  ) {
    super();
  }

  perform(currentState: SaveAsDashboardOrReportTemplateDialogState): SaveAsDashboardOrReportTemplateDialogState {
    const existingDashboardGroup = Utils.findElem(this.dashboardGroups, 'name', this.dashboardGroupName);
    const dashboardGroup = existingDashboardGroup ?? {
      name: this.dashboardGroupName,
      dashboards: []
    };

    if (!existingDashboardGroup) {
      this.dispatch(new AddDashboardGroupAction(dashboardGroup));
      this.dispatch(new AddDashboardToDashboardGroupAction(this.dashboard, dashboardGroup));
      this.dispatch(new CloseSaveAsDashboardOrReportTemplateDialogAction());
      this.dispatch(new ShowSavedSuccessfullyNotificationAction());
    }

    return currentState;
  }
}
