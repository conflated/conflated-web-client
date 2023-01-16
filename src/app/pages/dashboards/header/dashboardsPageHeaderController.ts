import OOReduxUtils from 'oo-redux-utils';
import ChangeDashboardSlideChangeIntervalAction from '../model/actions/slideshow/ChangeDashboardSlideChangeIntervalAction';
import CancelDelayedDashboardsPageHeaderHideAction from './model/actions/show/CancelDelayedDashboardsPageHeaderHideAction';
import ToggleShouldShowDashboardsPageHeaderPermanentlyAction from './model/actions/show/ToggleShouldShowDashboardsPageHeaderPermanentlyAction';
import ToggleDashboardsSlideShowPlayAction from '../model/actions/slideshow/ToggleDashboardsSlideShowPlayAction';
import HideDashboardsPageHeaderAction from './model/actions/show/HideDashboardsPageHeaderAction';
import SetDashboardsPageHeaderDelayedHideTimeoutIdAction from './model/actions/show/SetDashboardsPageHeaderDelayedHideTimeoutIdAction';
import Controller from '../../../../Controller';
import { AppState } from '../../../../store/AppState';
import store from '../../../../store/store';

class DashboardsPageHeaderController extends Controller {
  getState(appState: AppState) {
    return OOReduxUtils.mergeOwnAndForeignState(appState.dashboardsPage.headerState, {
      ...appState.dashboardsPage.dashboardsState,
      isFullScreenModeActive: appState.headerState.isFullScreenModeActive
    });
  }

  getActionDispatchers() {
    return {
      ...new DashboardsPageController(this.dispatch).getActionDispatchers(),
      hideDashboardsHeaderDelayed: (dashboardHeaderHideDelayInMillis: number) => {
        const timeoutId = setTimeout(
          () => this.dispatch(new HideDashboardsPageHeaderAction()),
          dashboardHeaderHideDelayInMillis
        );

        this.dispatch(new SetDashboardsPageHeaderDelayedHideTimeoutIdAction(timeoutId));
      },

      toggleDashboardsSlideShowPlay: () => {
        this.dispatch(new ToggleDashboardsSlideShowPlayAction(this.dispatch));
      },

      changeDashboardsSlideChangeInterval: (dashboardSlideChangeIntervalInSecsStr: string) => {
        this.dispatch(
          new ChangeDashboardSlideChangeIntervalAction(this.dispatch, dashboardSlideChangeIntervalInSecsStr)
        );
      },

      cancelDelayedDashboardsHeaderHide: () => {
        this.dispatch(new CancelDelayedDashboardsPageHeaderHideAction());
      },

      toggleShouldShowDashboardsHeaderPermanently: () => {
        this.dispatch(new ToggleShouldShowDashboardsPageHeaderPermanentlyAction());
      }
    };
  }
}

export const controller = new DashboardsPageHeaderController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
