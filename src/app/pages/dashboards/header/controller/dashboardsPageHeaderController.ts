import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import ChangeDashboardSlideChangeIntervalAction from '../../model/actions/slideshow/ChangeDashboardSlideChangeIntervalAction';
import CancelDelayedHeaderHideAction from '../model/actions/hide/CancelDelayedHeaderHideAction';
import ToggleShouldShowHeaderPermanentlyAction from '../model/actions/show/ToggleShouldShowHeaderPermanentlyAction';
import ToggleDashboardsSlideShowPlayAction from '../../model/actions/slideshow/ToggleDashboardsSlideShowPlayAction';
import { AppState } from '../../../../../store/AppState';
import store from '../../../../../store/store';
import { controller as dashboardsPageController } from '../../controller/dashboardsPageController';
import HideHeaderDelayedAction from '../model/actions/hide/HideHeaderDelayedAction';
import selectedNextDashboard from '../../controller/selectors/selectedNextDashboard';
import selectNextDashboardGroup from '../../controller/selectors/selectNextDashboardGroup';
import selectPreviousDashboard from '../../controller/selectors/selectPreviousDashboard';
import FilterDashboardGroupsAction from '../model/actions/filter/FilterDashboardGroupsAction';
import FilterDashboardsAction from '../model/actions/filter/FilterDashboardsAction';
import ActivateDashboardsTabPaneAction from '../model/actions/tabpane/ActivateDashboardsTabPaneAction';
import ActivateDashboardGroupsTabPaneAction from '../model/actions/tabpane/ActivateDashboardGroupsTabPaneAction';
import ShowKeyboardShortcutsMessageAction from '../model/actions/show/ShowKeyboardShortcutsMessageAction';
import HideKeyboardShortcutsMessageAction from '../model/actions/hide/HideKeyboardShortcutsMessageAction';

class DashboardsPageHeaderController extends Controller {
  getState = (appState: AppState) =>
    OOReduxUtils.mergeOwnAndForeignState(appState.dashboardsPage.headerState, {
      ...appState.dashboardsPage.dashboardsState,
      nextDashboard: selectedNextDashboard(appState),
      nextDashboardGroup: selectNextDashboardGroup(appState),
      previousDashboard: selectPreviousDashboard(appState),
      isFullScreenModeActive: appState.headerState.isFullScreenModeActive
    });

  actionDispatchers = {
    ...dashboardsPageController.actionDispatchers,

    hideDashboardsHeaderDelayed: (dashboardHeaderHideDelayInMillis: number) =>
      this.dispatch(new HideHeaderDelayedAction(dashboardHeaderHideDelayInMillis)),

    changeDashboardsSlideChangeInterval: (dashboardSlideChangeIntervalInSecsStr: string) =>
      this.dispatch(new ChangeDashboardSlideChangeIntervalAction(dashboardSlideChangeIntervalInSecsStr)),

    activateDashboardsTabPane: (tabPane: 'ALL' | 'FAVORITES') =>
      this.dispatch(new ActivateDashboardsTabPaneAction(tabPane)),

    activateDashboardGroupsTabPane: (tabPane: 'ALL' | 'FAVORITES') =>
      this.dispatch(new ActivateDashboardGroupsTabPaneAction(tabPane)),

    cancelDelayedDashboardsHeaderHide: () => this.dispatch(new CancelDelayedHeaderHideAction()),
    filterDashboardGroups: (filterText: string) => this.dispatch(new FilterDashboardGroupsAction(filterText)),
    filterDashboards: (filterText: string) => this.dispatch(new FilterDashboardsAction(filterText)),
    toggleDashboardsSlideShowPlay: () => this.dispatch(new ToggleDashboardsSlideShowPlayAction()),
    toggleShouldShowDashboardsHeaderPermanently: () => this.dispatch(new ToggleShouldShowHeaderPermanentlyAction()),
    showKeyboardShortcutsMessage: () => this.dispatch(new ShowKeyboardShortcutsMessageAction()),
    hideKeyboardShortcutsMessage: () => this.dispatch(new HideKeyboardShortcutsMessageAction())
  };
}

export const controller = new DashboardsPageHeaderController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
