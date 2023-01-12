import type { DashboardsState } from '../../state/DashboardsState';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';
import type { DashboardGroup } from '../../state/entities/DashboardGroup';

export default class AddDashboardGroupAction extends AbstractDashboardsPageAction {
  constructor(private readonly dashboardGroup: DashboardGroup) {
    super();
  }

  performActionAndReturnNewState(currentState: DashboardsState): DashboardsState {
    const newState = {
      ...currentState,
      dashboardGroups: [...currentState.dashboardGroups, this.dashboardGroup]
    };

    return newState;
  }
}
