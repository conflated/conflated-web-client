import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';
import type { DashboardsPageState } from '../../state/DashboardsPageState';
import ShowDashboardAction from '../show/ShowDashboardAction';

export default class ShowNextDashboardInSlideShowAction extends AbstractDashboardsPageAction {
  perform(currentState: DashboardsPageState): DashboardsPageState {
    const dashboards = currentState.selectedDashboardGroup?.dashboards;

    const nextDashboardIndexShownInSlideShow =
      (currentState.dashboardIndexShownInSlideShow + 1) % (dashboards?.length ?? 1);

    const nextDashboard = dashboards?.[nextDashboardIndexShownInSlideShow];
    this.dispatch(new ShowDashboardAction(nextDashboard));

    const newState = {
      ...currentState,
      selectedDashboard: nextDashboard,
      dashboardIndexShownInSlideShow: nextDashboardIndexShownInSlideShow
    };

    return newState;
  }
}
