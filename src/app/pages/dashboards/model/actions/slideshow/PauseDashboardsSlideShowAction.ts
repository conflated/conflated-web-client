import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';
import type { DashboardsState } from '../../state/DashboardsState';

export default class PauseDashboardsSlideShowAction extends AbstractDashboardsPageAction {
  perform(currentState: DashboardsState): DashboardsState {
    clearInterval(currentState.dashboardsSlideShowIntervalId);

    const newState = {
      ...currentState,
      isDashboardsSlideShowPlaying: false
    };

    return newState;
  }
}
