import type { DashboardsState } from '../../state/DashboardsState';
import type { DashboardGroup } from '../../state/entities/DashboardGroup';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';

export default class ChangeSelectedDashboardGroupAction extends AbstractDashboardsPageAction {
  constructor(private readonly dashboardGroup: DashboardGroup) {
    super();
  }

  performActionAndReturnNewState(currentState: DashboardsState): DashboardsState {
    const newState = {
      ...currentState,
      selectedDashboardGroup: this.dashboardGroup,
      selectedDashboard: this.dashboardGroup.dashboards?.[0],
      dashboardIndexShownInSlideShow: 0
    };

    return newState;
  }
}
