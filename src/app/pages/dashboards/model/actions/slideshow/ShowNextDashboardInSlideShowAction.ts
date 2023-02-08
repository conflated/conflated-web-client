import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';
import type { DashboardsState } from '../../state/DashboardsState';

export default class ShowNextDashboardInSlideShowAction extends AbstractDashboardsPageAction {
  perform(currentState: DashboardsState): DashboardsState {
    const dashboards = currentState.selectedDashboardGroup?.dashboards;
    const nextDashboardIndexShownInSlideShow =
      (currentState.dashboardIndexShownInSlideShow + 1) % (dashboards?.length ?? 1);

    const newState = {
      ...currentState,
      selectedDashboard: dashboards?.[nextDashboardIndexShownInSlideShow],
      dashboardIndexShownInSlideShow: nextDashboardIndexShownInSlideShow
    };

    return newState;
  }
}
