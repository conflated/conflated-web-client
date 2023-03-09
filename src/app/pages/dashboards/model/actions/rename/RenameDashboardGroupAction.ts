import type { DashboardsPageState } from '../../state/DashboardsPageState';
import type { DashboardGroup } from '../../state/types/DashboardGroup';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';

export default class RenameDashboardGroupAction extends AbstractDashboardsPageAction {
  constructor(private readonly dashboardGroup: DashboardGroup, private readonly newName: string) {
    super();
  }

  perform(currentState: DashboardsPageState): DashboardsPageState {
    const { dashboardGroups, selectedDashboardGroup } = currentState;
    const newDashboardGroup = { ...this.dashboardGroup, name: this.newName };

    const newState = {
      ...currentState,
      dashboardGroups: dashboardGroups.map((dashboardGroup) =>
        dashboardGroup === this.dashboardGroup ? newDashboardGroup : dashboardGroup
      ),
      selectedDashboardGroup:
        selectedDashboardGroup === this.dashboardGroup ? newDashboardGroup : selectedDashboardGroup
    };

    return newState;
  }
}
