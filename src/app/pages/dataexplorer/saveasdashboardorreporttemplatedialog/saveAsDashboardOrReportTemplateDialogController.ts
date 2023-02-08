import OOReduxUtils from 'oo-redux-utils2';
import StartFetchDashboardGroupsAction from '../../dashboards/model/actions/fetchdata/StartFetchDashboardGroupsAction';
import CloseSaveAsDashboardOrReportTemplateDialogAction from './model/actions/CloseSaveAsDashboardOrReportTemplateDialogAction';
import HideSavedSuccessfullyNotificationAction from './model/actions/HideSavedSuccessfullyNotificationAction';
import diContainer from '../../../../di/diContainer';
import type { DashboardGroup } from '../../dashboards/model/state/entities/DashboardGroup';
import AddDashboardGroupAction from '../../dashboards/model/actions/add/AddDashboardGroupAction';
import AddDashboardToDashboardGroupAction from '../../dashboards/model/actions/add/AddDashboardToDashboardGroupAction';
import Utils from '../../../common/model/state/utils/Utils';
import ShowSavedSuccessfullyNotificationAction from './model/actions/ShowSavedSuccessfullyNotificationAction';
import type { Dashboard } from '../../dashboards/model/state/entities/Dashboard';
import Controller from '../../../../Controller';
import store from '../../../../store/store';
import { AppState } from '../../../../store/AppState';

export default class SaveAsDashboardOrReportTemplateDialogController extends Controller {
  getState(appState: AppState) {
    return OOReduxUtils.mergeOwnAndForeignState(appState.dataExplorerPage.saveAsDashboardOrReportTemplateDialogState, {
      dashboardGroups: appState.dashboardsPage.dashboardsState.dashboardGroups,
      layout: appState.dataExplorerPage.chartAreaState.layout,
      charts: appState.dataExplorerPage.chartAreaState.charts
    });
  }

  getActionDispatchers() {
    return {
      closeDialog: () => this.dispatch(new CloseSaveAsDashboardOrReportTemplateDialogAction()),
      hideSavedSuccessfullyNotification: () => this.dispatch(new HideSavedSuccessfullyNotificationAction()),
      startFetchDashboardGroups: () => this.dispatchWithDi(diContainer, StartFetchDashboardGroupsAction, {}),

      saveDashboard: (
        dashboardGroupName: string,
        dashboardName: string,
        dashboardGroups: DashboardGroup[],
        dashboard: Dashboard
      ) => {
        const existingDashboardGroup = Utils.findElem(dashboardGroups, 'name', dashboardGroupName);
        const dashboardGroup = existingDashboardGroup ?? {
          name: dashboardGroupName,
          dashboards: []
        };

        if (!existingDashboardGroup) {
          this.dispatch(new AddDashboardGroupAction(dashboardGroup));
          this.dispatch(new AddDashboardToDashboardGroupAction(dashboard, dashboardGroup));
          this.dispatch(new CloseSaveAsDashboardOrReportTemplateDialogAction());
          this.dispatch(new ShowSavedSuccessfullyNotificationAction());
        }
      }
    };
  }
}

export const controller = new SaveAsDashboardOrReportTemplateDialogController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
