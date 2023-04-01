import type { DashboardsPageState } from '../../state/DashboardsPageState';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';
import type { Dashboard } from '../../state/types/Dashboard';
import type { DashboardGroup } from '../../state/types/DashboardGroup';
import Utils from '../../../../../common/utils/Utils';

export default class AddDashboardToDashboardGroupAction extends AbstractDashboardsPageAction {
  constructor(private readonly dashboard: Dashboard, private readonly dashboardGroup: DashboardGroup) {
    super();
  }

  perform(currentState: DashboardsPageState): DashboardsPageState {
    const newDashboardGroup = {
      ...this.dashboardGroup,
      dashboards: [...this.dashboardGroup.dashboards, this.dashboard]
    };

    const newState = {
      ...currentState,
      selectedDashboardGroup:
        currentState.selectedDashboardGroup === this.dashboardGroup
          ? newDashboardGroup
          : currentState.selectedDashboardGroup,
      dashboardGroups: Utils.replace(currentState.dashboardGroups, this.dashboardGroup, newDashboardGroup)
    };

    return newState;
  }
}
