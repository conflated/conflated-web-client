import { Controller } from 'oo-redux-utils2';
import ExitFullScreenModeAction from '../model/actions/fullscreen/ExitFullScreenModeAction';
import EnterFullScreenModeAction from '../model/actions/fullscreen/EnterFullScreenModeAction';
import ShowFullScreenModeNotificationAction from '../model/actions/fullscreen/notification/ShowFullScreenModeNotificationAction';
import DismissFullScreenModeNotificationAction from '../model/actions/fullscreen/notification/DismissFullScreenModeNotificationAction';
import ShowHeaderAction from '../../pages/dashboards/header/model/actions/show/ShowHeaderAction';
import SelectPageAction from '../model/actions/SelectPageAction';
import type { PageStateNamespace } from '../../common/components/page/model/state/types/PageStateNamespace';
import store from '../../../store/store';
import { AppState } from '../../../store/AppState';

class HeaderController extends Controller {
  readonly actionDispatchers = {
    exitFullScreenMode: () => this.dispatch(new ExitFullScreenModeAction()),
    switchToFullScreenMode: () => this.dispatch(new EnterFullScreenModeAction()),
    showFullScreenModeNotification: () => this.dispatch(new ShowFullScreenModeNotificationAction()),
    dismissFullScreenModeNotification: () => this.dispatch(new DismissFullScreenModeNotificationAction()),
    showDashboardsHeader: () => this.dispatch(new ShowHeaderAction()),
    selectPage: (page: PageStateNamespace) => this.dispatch(new SelectPageAction(page))
  };

  getState(appState: AppState) {
    return appState.headerState;
  }
}

export const controller = new HeaderController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
