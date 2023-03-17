import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';
import type { DashboardsPageState } from '../../state/DashboardsPageState';

export default class PauseDashboardsSlideShowAction extends AbstractDashboardsPageAction {
  perform(currentState: DashboardsPageState): DashboardsPageState {
    clearInterval(currentState.dashboardsSlideShowIntervalId);
    currentState.screenWakeLockPromise?.then((screenWakeLock) => screenWakeLock.release());

    return {
      ...currentState,
      isDashboardsSlideShowPlaying: false
    };
  }
}
