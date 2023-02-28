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
import SetDashboardGroupFilterTextAction from '../model/actions/filter/SetDashboardGroupFilterTextAction';
import SetDashboardFilterTextAction from '../model/actions/filter/SetDashboardFilterTextAction';

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

    toggleDashboardsSlideShowPlay: () => this.dispatch(new ToggleDashboardsSlideShowPlayAction()),

    changeDashboardsSlideChangeInterval: (dashboardSlideChangeIntervalInSecsStr: string) =>
      this.dispatch(new ChangeDashboardSlideChangeIntervalAction(dashboardSlideChangeIntervalInSecsStr)),

    cancelDelayedDashboardsHeaderHide: () => this.dispatch(new CancelDelayedHeaderHideAction()),

    toggleShouldShowDashboardsHeaderPermanently: () => this.dispatch(new ToggleShouldShowHeaderPermanentlyAction()),

    setDashboardGroupFilterText: (filterText: string) =>
      this.dispatch(new SetDashboardGroupFilterTextAction(filterText)),

    setDashboardFilterText: (filterText: string) => this.dispatch(new SetDashboardFilterTextAction(filterText))
  };
}

export const controller = new DashboardsPageHeaderController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
