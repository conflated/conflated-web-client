import type { DashboardsState } from '../../state/DashboardsState';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';
import type { Dashboard } from '../../state/entities/Dashboard';
import type { DashboardGroup } from '../../state/entities/DashboardGroup';
import Utils from '../../../../../common/model/state/utils/Utils';

export default class AddDashboardToDashboardGroupAction extends AbstractDashboardsPageAction {
  constructor(private readonly dashboard: Dashboard, private readonly dashboardGroup: DashboardGroup) {
    super();
  }

  perform(currentState: DashboardsState): DashboardsState {
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
