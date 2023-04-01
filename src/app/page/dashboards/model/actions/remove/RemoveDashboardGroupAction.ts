import _ from 'lodash';
import type { DashboardsPageState } from '../../state/DashboardsPageState';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';
import type { DashboardGroup } from '../../state/types/DashboardGroup';

export default class RemoveDashboardGroupAction extends AbstractDashboardsPageAction {
  constructor(private readonly dashboardGroup?: DashboardGroup) {
    super();
  }

  perform(currentState: DashboardsPageState): DashboardsPageState {
    if (this.dashboardGroup) {
      const { dashboardGroups, selectedDashboardGroup } = currentState;
      const selectedDashboardGroupIndex = selectedDashboardGroup ? dashboardGroups.indexOf(selectedDashboardGroup) : 0;

      const newSelectedDashboardGroupIndex =
        selectedDashboardGroupIndex < dashboardGroups.length - 1
          ? dashboardGroups[selectedDashboardGroupIndex + 1]
          : dashboardGroups[dashboardGroups.length - 1];

      const newState = {
        ...currentState,
        dashboardGroups: _.without(dashboardGroups, this.dashboardGroup),
        selectedDashboardGroup:
          selectedDashboardGroup === this.dashboardGroup ? newSelectedDashboardGroupIndex : selectedDashboardGroup
      };

      return newState;
    }

    return currentState;
  }
}
