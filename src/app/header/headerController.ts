import { Controller } from 'oo-redux-utils2';
import ExitFullScreenModeAction from './model/actions/ExitFullScreenModeAction';
import SwitchToFullScreenModeAction from './model/actions/SwitchToFullScreenModeAction';
import ShowFullScreenModeNotificationAction from './model/actions/ShowFullScreenModeNotificationAction';
import DismissFullScreenModeNotificationAction from './model/actions/DismissFullScreenModeNotificationAction';
import ShowDashboardsPageHeaderAction from '../pages/dashboards/header/model/actions/show/ShowDashboardsPageHeaderAction';
import SelectPageAction from './model/actions/SelectPageAction';
import type { PageStateNamespace } from '../common/components/page/model/state/types/PageStateNamespace';
import store from '../../store/store';
import { AppState } from '../../store/AppState';

class HeaderController extends Controller {
  readonly actionDispatchers = {
    exitFullScreenMode: () => this.dispatch(new ExitFullScreenModeAction()),
    switchToFullScreenMode: () => this.dispatch(new SwitchToFullScreenModeAction()),
    showFullScreenModeNotification: () => this.dispatch(new ShowFullScreenModeNotificationAction()),
    dismissFullScreenModeNotification: () => this.dispatch(new DismissFullScreenModeNotificationAction()),
    showDashboardsHeader: () => this.dispatch(new ShowDashboardsPageHeaderAction()),
    selectPage: (page: PageStateNamespace) => this.dispatch(new SelectPageAction(page))
  };

  getState(appState: AppState) {
    return appState.headerState;
  }
}

export const controller = new HeaderController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
