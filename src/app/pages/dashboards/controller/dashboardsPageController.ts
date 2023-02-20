import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import StartFetchDashboardGroupsAction from '../model/actions/fetchdata/StartFetchDashboardGroupsAction';
import diContainer from '../../../../di/diContainer';
import type { Dashboard } from '../model/state/types/Dashboard';
import ChangeChartAreaLayoutAndChartsAction from '../../../common/components/chartarea/model/actions/layout/ChangeChartAreaLayoutAndChartsAction';
import StartFetchDataForOtherChartsAction from '../../../common/components/chartarea/model/actions/chart/fetchdata/StartFetchDataForOtherChartsAction';
import type { DashboardGroup } from '../model/state/types/DashboardGroup';
import ChangeSelectedDashboardAction from '../model/actions/changeselected/ChangeSelectedDashboardAction';
import ShowDashboardsPageHeaderAction from '../header/model/actions/ShowDashboardsPageHeaderAction';
import HideDashboardsPageHeaderAction from '../header/model/actions/HideDashboardsPageHeaderAction';
import Constants from '../../../common/Constants';
import SetDashboardsPageHeaderDelayedHideTimeoutIdAction from '../header/model/actions/SetDashboardsPageHeaderDelayedHideTimeoutIdAction';
import { ChartAreaPageStateNamespace } from '../../../common/components/chartarea/model/state/types/ChartAreaPageStateNamespace';
import store from '../../../../store/store';
import { AppState } from '../../../../store/AppState';
import selectedNextDashboard from './selectors/selectedNextDashboard';
import selectNextDashboardGroup from './selectors/selectNextDashboardGroup';
import selectPreviousDashboard from './selectors/selectPreviousDashboard';
import selectPreviousDashboardGroup from './selectors/selectPreviousDashboardGroup';
import selectFirstDashboard from './selectors/selectFirstDashboard';
import selectLastDashboard from './selectors/selectLastDashboard';
import ShowDashboardGroupAction from '../model/actions/show/ShowDashboardGroupAction';

class DashboardsPageController extends Controller<ChartAreaPageStateNamespace | ''> {
  getState = (appState: AppState) =>
    OOReduxUtils.mergeOwnAndForeignState(appState.dashboardsPage.dashboardsState, {
      firstDashboard: selectFirstDashboard(appState),
      lastDashboard: selectLastDashboard(appState),
      nextDashboard: selectedNextDashboard(appState),
      nextDashboardGroup: selectNextDashboardGroup(appState),
      previousDashboard: selectPreviousDashboard(appState),
      previousDashboardGroup: selectPreviousDashboardGroup(appState),
      shouldShowDashboardsPageHeaderPermanently:
        appState.dashboardsPage.headerState.shouldShowDashboardsHeaderPermanently
    });

  readonly actionDispatchers = {
    showDashboardGroup: (dashboardGroup: DashboardGroup | undefined) =>
      this.dispatch(new ShowDashboardGroupAction(dashboardGroup)),

    startFetchDashboardGroups: () => this.dispatchWithDi(StartFetchDashboardGroupsAction, diContainer, {}),

    showDashboard: (dashboard: Dashboard | undefined) => {
      if (dashboard) {
        this.dispatch(new ChangeSelectedDashboardAction(dashboard));
        this.dispatch(new ChangeChartAreaLayoutAndChartsAction('dashboardsPage', dashboard.layout, dashboard.charts));

        this.dispatchWithDi(StartFetchDataForOtherChartsAction, diContainer, {
          pageStateNamespace: 'dashboardsPage',
          chart: null
        });
      }
    },

    showDashboardsHeaderBriefly: () => {
      this.dispatch(new ShowDashboardsPageHeaderAction());

      const headerDelayedHideTimeoutId = setTimeout(
        () => this.dispatch(new HideDashboardsPageHeaderAction()),
        Constants.SHOW_DASHBOARDS_HEADER_BRIEFLY_DURATION_IN_MILLIS
      );

      this.dispatch(new SetDashboardsPageHeaderDelayedHideTimeoutIdAction(headerDelayedHideTimeoutId));
    }
  };
}

export const controller = new DashboardsPageController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
