import type { DashboardsPageState } from '../../state/DashboardsPageState';
import type { Dashboard } from '../../state/types/Dashboard';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';

export default class SelectDashboardAction extends AbstractDashboardsPageAction {
  constructor(private readonly dashboard: Dashboard) {
    super();
  }

  perform(currentState: DashboardsPageState): DashboardsPageState {
    const newState = {
      ...currentState,
      selectedDashboard: this.dashboard
    };

    return newState;
  }
}
