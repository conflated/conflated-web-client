import type { DashboardsState } from '../../state/DashboardsState';
import type { Dashboard } from '../../state/entities/Dashboard';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';

export default class ChangeSelectedDashboardAction extends AbstractDashboardsPageAction {
  constructor(private readonly dashboard: Dashboard) {
    super();
  }

  performActionAndReturnNewState(currentState: DashboardsState): DashboardsState {
    const newState = {
      ...currentState,
      selectedDashboard: this.dashboard
    };

    return newState;
  }
}
