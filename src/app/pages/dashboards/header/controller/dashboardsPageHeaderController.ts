import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import ChangeDashboardSlideChangeIntervalAction from '../../model/actions/slideshow/ChangeDashboardSlideChangeIntervalAction';
import CancelDelayedDashboardsPageHeaderHideAction from '../model/actions/CancelDelayedDashboardsPageHeaderHideAction';
import ToggleShouldShowDashboardsPageHeaderPermanentlyAction from '../model/actions/ToggleShouldShowDashboardsPageHeaderPermanentlyAction';
import ToggleDashboardsSlideShowPlayAction from '../../model/actions/slideshow/ToggleDashboardsSlideShowPlayAction';
import HideDashboardsPageHeaderAction from '../model/actions/HideDashboardsPageHeaderAction';
import SetDashboardsPageHeaderDelayedHideTimeoutIdAction from '../model/actions/SetDashboardsPageHeaderDelayedHideTimeoutIdAction';
import { AppState } from '../../../../../store/AppState';
import store from '../../../../../store/store';
import { controller as dashboardsPageController } from '../../controller/dashboardsPageController';

class DashboardsPageHeaderController extends Controller {
  getState = (appState: AppState) =>
    OOReduxUtils.mergeOwnAndForeignState(appState.dashboardsPage.headerState, {
      ...appState.dashboardsPage.dashboardsState,
      isFullScreenModeActive: appState.headerState.isFullScreenModeActive
    });

  actionDispatchers = {
    ...dashboardsPageController.actionDispatchers,

    hideDashboardsHeaderDelayed: (dashboardHeaderHideDelayInMillis: number) => {
      const timeoutId = setTimeout(
        () => this.dispatch(new HideDashboardsPageHeaderAction()),
        dashboardHeaderHideDelayInMillis
      );

      this.dispatch(new SetDashboardsPageHeaderDelayedHideTimeoutIdAction(timeoutId));
    },

    toggleDashboardsSlideShowPlay: () => {
      this.dispatch(new ToggleDashboardsSlideShowPlayAction());
    },

    changeDashboardsSlideChangeInterval: (dashboardSlideChangeIntervalInSecsStr: string) => {
      this.dispatch(new ChangeDashboardSlideChangeIntervalAction(dashboardSlideChangeIntervalInSecsStr));
    },

    cancelDelayedDashboardsHeaderHide: () => {
      this.dispatch(new CancelDelayedDashboardsPageHeaderHideAction());
    },

    toggleShouldShowDashboardsHeaderPermanently: () => {
      this.dispatch(new ToggleShouldShowDashboardsPageHeaderPermanentlyAction());
    }
  };
}

export const controller = new DashboardsPageHeaderController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
