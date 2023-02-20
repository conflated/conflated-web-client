import type { DashboardsState } from '../../state/DashboardsState';
import type { Dashboard } from '../../state/types/Dashboard';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';

export default class ChangeSelectedDashboardAction extends AbstractDashboardsPageAction {
  constructor(private readonly dashboard: Dashboard) {
    super();
  }

  perform(currentState: DashboardsState): DashboardsState {
    const newState = {
      ...currentState,
      selectedDashboard: this.dashboard
    };

    return newState;
  }
}
