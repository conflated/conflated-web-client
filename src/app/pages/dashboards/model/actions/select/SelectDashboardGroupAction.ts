import type { DashboardsState } from '../../state/DashboardsState';
import type { DashboardGroup } from '../../state/types/DashboardGroup';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';

export default class SelectDashboardGroupAction extends AbstractDashboardsPageAction {
  constructor(private readonly dashboardGroup: DashboardGroup) {
    super();
  }

  perform(currentState: DashboardsState): DashboardsState {
    const newState = {
      ...currentState,
      selectedDashboardGroup: this.dashboardGroup,
      selectedDashboard: this.dashboardGroup.dashboards?.[0],
      dashboardIndexShownInSlideShow: 0
    };

    return newState;
  }
}
