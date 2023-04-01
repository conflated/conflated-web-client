import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import StartFetchDashboardGroupsAction from '../../../../dashboards/model/actions/fetchdata/StartFetchDashboardGroupsAction';
import CloseSaveAsDashboardOrReportTemplateDialogAction from '../model/actions/CloseSaveAsDashboardOrReportTemplateDialogAction';
import HideSavedSuccessfullyNotificationAction from '../model/actions/HideSavedSuccessfullyNotificationAction';
import diContainer from '../../../../../../di/diContainer';
import type { DashboardGroup } from '../../../../dashboards/model/state/types/DashboardGroup';
import type { Dashboard } from '../../../../dashboards/model/state/types/Dashboard';
import store from '../../../../../../store/store';
import { AppState } from '../../../../../../store/AppState';
import SaveDashboardAction from '../model/actions/SaveDashboardAction';

export default class SaveAsDashboardOrReportTemplateDialogController extends Controller {
  getState = (appState: AppState) =>
    OOReduxUtils.mergeOwnAndForeignState(appState.dataExplorerPage.saveAsDashboardOrReportTemplateDialogState, {
      dashboardGroups: appState.dashboardsPage.dashboardsState.dashboardGroups,
      layout: appState.dataExplorerPage.chartAreaState.layout,
      charts: appState.dataExplorerPage.chartAreaState.charts
    });

  actionDispatchers = {
    closeDialog: () => this.dispatch(new CloseSaveAsDashboardOrReportTemplateDialogAction()),
    hideSavedSuccessfullyNotification: () => this.dispatch(new HideSavedSuccessfullyNotificationAction()),
    startFetchDashboardGroups: () => this.dispatchWithDi(StartFetchDashboardGroupsAction, diContainer, {}),

    saveDashboard: (
      dashboardGroupName: string,
      dashboardName: string,
      dashboardGroups: DashboardGroup[],
      dashboard: Dashboard
    ) => this.dispatch(new SaveDashboardAction(dashboardGroupName, dashboardName, dashboardGroups, dashboard))
  };
}

export const controller = new SaveAsDashboardOrReportTemplateDialogController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
