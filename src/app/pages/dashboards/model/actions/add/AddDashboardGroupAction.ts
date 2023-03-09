import type { DashboardsPageState } from '../../state/DashboardsPageState';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';
import type { DashboardGroup } from '../../state/types/DashboardGroup';

export default class AddDashboardGroupAction extends AbstractDashboardsPageAction {
  constructor(private readonly dashboardGroup: DashboardGroup) {
    super();
  }

  perform(currentState: DashboardsPageState): DashboardsPageState {
    const newState = {
      ...currentState,
      dashboardGroups: [...currentState.dashboardGroups, this.dashboardGroup]
    };

    return newState;
  }
}
