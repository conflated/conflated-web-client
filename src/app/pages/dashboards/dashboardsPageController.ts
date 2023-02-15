import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import StartFetchDashboardGroupsAction from './model/actions/fetchdata/StartFetchDashboardGroupsAction';
import diContainer from '../../../di/diContainer';
import type { Dashboard } from './model/state/entities/Dashboard';
import ChangeChartAreaLayoutAndChartsAction from '../../common/components/chartarea/model/actions/layout/ChangeChartAreaLayoutAndChartsAction';
import StartFetchDataForOtherChartsAction from '../../common/components/chartarea/model/actions/chart/fetchdata/StartFetchDataForOtherChartsAction';
import type { DashboardGroup } from './model/state/entities/DashboardGroup';
import ChangeSelectedDashboardGroupAction from './model/actions/changeselected/ChangeSelectedDashboardGroupAction';
import ChangeSelectedDashboardAction from './model/actions/changeselected/ChangeSelectedDashboardAction';
import ShowDashboardsPageHeaderAction from './header/model/actions/show/ShowDashboardsPageHeaderAction';
import HideDashboardsPageHeaderAction from './header/model/actions/show/HideDashboardsPageHeaderAction';
import Constants from '../../common/Constants';
import SetDashboardsPageHeaderDelayedHideTimeoutIdAction from './header/model/actions/show/SetDashboardsPageHeaderDelayedHideTimeoutIdAction';
import { ChartAreaPageStateNamespace } from '../../common/components/chartarea/model/state/types/ChartAreaPageStateNamespace';
import store from '../../../store/store';
import { AppState } from '../../../store/AppState';
import selectedNextDashboard from './model/state/selectors/selectedNextDashboard';
import selectNextDashboardGroup from './model/state/selectors/selectNextDashboardGroup';
import selectPreviousDashboard from './model/state/selectors/selectPreviousDashboard';
import selectPreviousDashboardGroup from './model/state/selectors/selectPreviousDashboardGroup';

class DashboardsPageController extends Controller<ChartAreaPageStateNamespace | ''> {
  getState(appState: AppState) {
    return OOReduxUtils.mergeOwnAndForeignState(appState.dashboardsPage.dashboardsState, {
      nextDashboard: selectedNextDashboard(appState),
      nextDashboardGroup: selectNextDashboardGroup(appState),
      previousDashboard: selectPreviousDashboard(appState),
      previousDashboardGroup: selectPreviousDashboardGroup(appState),
      shouldShowDashboardsPageHeaderPermanently:
        appState.dashboardsPage.headerState.shouldShowDashboardsHeaderPermanently
    });
  }

  showDashboardGroup = (dashboardGroup: DashboardGroup | undefined) => {
    if (dashboardGroup) {
      this.dispatch(new ChangeSelectedDashboardGroupAction(dashboardGroup));
      const newSelectedDashboard = dashboardGroup.dashboards?.[0];

      if (newSelectedDashboard) {
        this.dispatch(
          new ChangeChartAreaLayoutAndChartsAction(
            'dashboardsPage',
            newSelectedDashboard.layout,
            newSelectedDashboard.charts
          )
        );

        this.dispatchWithDi(StartFetchDataForOtherChartsAction, diContainer, {
          stateNamespace: 'dashboardsPage',
          chart: null
        });
      }
    }
  };

  getActionDispatchers() {
    return {
      showDashboardGroup: this.showDashboardGroup,

      startFetchDashboardGroups: () =>
        this.dispatchWithDi(StartFetchDashboardGroupsAction, diContainer, {
          showDashboardGroup: this.showDashboardGroup
        }),

      showDashboard: (dashboard: Dashboard | undefined) => {
        if (dashboard) {
          this.dispatch(new ChangeSelectedDashboardAction(dashboard));
          this.dispatch(new ChangeChartAreaLayoutAndChartsAction('dashboardsPage', dashboard.layout, dashboard.charts));

          this.dispatchWithDi(StartFetchDataForOtherChartsAction, diContainer, {
            stateNamespace: 'dashboardsPage',
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
}

export const controller = new DashboardsPageController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
