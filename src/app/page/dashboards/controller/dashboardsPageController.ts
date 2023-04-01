import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import StartFetchDashboardGroupsAction from '../model/actions/fetchdata/StartFetchDashboardGroupsAction';
import diContainer from '../../../../di/diContainer';
import type { Dashboard } from '../model/state/types/Dashboard';
import type { DashboardGroup } from '../model/state/types/DashboardGroup';
import { ChartAreaStateNamespace } from '../../../common/components/chartarea/model/state/types/ChartAreaStateNamespace';
import store from '../../../../store/store';
import { AppState } from '../../../../store/AppState';
import selectedNextDashboard from './selectors/selectedNextDashboard';
import selectNextDashboardGroup from './selectors/selectNextDashboardGroup';
import selectPreviousDashboard from './selectors/selectPreviousDashboard';
import selectPreviousDashboardGroup from './selectors/selectPreviousDashboardGroup';
import selectFirstDashboard from './selectors/selectFirstDashboard';
import selectLastDashboard from './selectors/selectLastDashboard';
import ShowDashboardGroupAction from '../model/actions/show/ShowDashboardGroupAction';
import ShowDashboardAction from '../model/actions/show/ShowDashboardAction';
import ShowDashboardsPageHeaderBrieflyAction from '../header/model/actions/show/ShowHeaderBrieflyAction';

class DashboardsPageController extends Controller<ChartAreaStateNamespace | ''> {
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
    showDashboard: (dashboard: Dashboard | undefined) => this.dispatch(new ShowDashboardAction(dashboard)),

    showDashboardsHeaderBriefly: () => {
      this.dispatch(new ShowDashboardsPageHeaderBrieflyAction());
    }
  };
}

export const controller = new DashboardsPageController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
