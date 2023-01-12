import { ControllerFactory } from 'oo-redux-utils';
import StartFetchDashboardGroupsAction from '../../../dashboardspage/model/actions/fetchdata/StartFetchDashboardGroupsAction';
import CloseSaveAsDashboardOrReportTemplateDialogAction from '../model/actions/CloseSaveAsDashboardOrReportTemplateDialogAction';
import HideSavedSuccessfullyNotificationAction from '../model/actions/HideSavedSuccessfullyNotificationAction';
import diContainer from '../../../diContainer';
import type { DashboardGroup } from '../../../dashboardspage/model/state/entities/DashboardGroup';
import AddDashboardGroupAction from '../../../dashboardspage/model/actions/add/AddDashboardGroupAction';
import AddDashboardToDashboardGroupAction from '../../../dashboardspage/model/actions/add/AddDashboardToDashboardGroupAction';
import Utils from '../../../common/model/state/utils/Utils';
import ShowSavedSuccessfullyNotificationAction from '../model/actions/ShowSavedSuccessfullyNotificationAction';
import type { Dashboard } from '../../../dashboardspage/model/state/entities/Dashboard';

export default class SaveAsDashboardOrReportTemplateDialogControllerFactory extends ControllerFactory {
  closeDialog() {
    this.dispatchAction(new CloseSaveAsDashboardOrReportTemplateDialogAction());
  }

  hideSavedSuccessfullyNotification() {
    this.dispatchAction(new HideSavedSuccessfullyNotificationAction());
  }

  saveDashboard(
    dashboardGroupName: string,
    dashboardName: string,
    dashboardGroups: DashboardGroup[],
    dashboard: Dashboard
  ) {
    const existingDashboardGroup = Utils.findElem(dashboardGroups, 'name', dashboardGroupName);
    const dashboardGroup = existingDashboardGroup ?? {
      name: dashboardGroupName,
      dashboards: []
    };

    if (!existingDashboardGroup) {
      this.dispatchAction(new AddDashboardGroupAction(dashboardGroup));
      this.dispatchAction(new AddDashboardToDashboardGroupAction(dashboard, dashboardGroup));
      this.dispatchAction(new CloseSaveAsDashboardOrReportTemplateDialogAction());
      this.dispatchAction(new ShowSavedSuccessfullyNotificationAction());
    }
  }

  async startFetchDashboardGroups(): Promise<void> {
    this.dispatchActionWithDi(diContainer, StartFetchDashboardGroupsAction, {});
  }

  createController = () => ({
    closeDialog: this.closeDialog,
    hideSavedSuccessfullyNotification: this.hideSavedSuccessfullyNotification,
    saveDashboard: this.saveDashboard,
    startFetchDashboardGroups: this.startFetchDashboardGroups
  });
}
