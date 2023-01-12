import { ControllerFactory } from 'oo-redux-utils';
import ExitFullScreenModeAction from '../model/actions/ExitFullScreenModeAction';
import SwitchToFullScreenModeAction from '../model/actions/SwitchToFullScreenModeAction';
import ShowFullScreenModeNotificationAction from '../model/actions/ShowFullScreenModeNotificationAction';
import DismissFullScreenModeNotificationAction from '../model/actions/DismissFullScreenModeNotificationAction';
import ShowDashboardsPageHeaderAction from '../../dashboardspage/header/model/actions/show/ShowDashboardsPageHeaderAction';
import SelectPageAction from '../model/actions/SelectPageAction';
import type { PageStateNamespace } from '../../common/components/page/model/state/namespace/PageStateNamespace';

export default class HeaderControllerFactory extends ControllerFactory {
  createController() {
    return {
      exitFullScreenMode: () => this.dispatchAction(new ExitFullScreenModeAction()),
      switchToFullScreenMode: () => this.dispatchAction(new SwitchToFullScreenModeAction()),
      showFullScreenModeNotification: () => this.dispatchAction(new ShowFullScreenModeNotificationAction()),
      dismissFullScreenModeNotification: () => this.dispatchAction(new DismissFullScreenModeNotificationAction()),
      showDashboardsHeader: () => this.dispatchAction(new ShowDashboardsPageHeaderAction()),
      selectPage: (page: PageStateNamespace) => this.dispatchAction(new SelectPageAction(page))
    };
  }
}
