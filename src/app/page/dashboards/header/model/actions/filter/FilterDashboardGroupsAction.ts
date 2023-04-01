import AbstractDashboardsPageHeaderAction from '../AbstractDashboardsPageHeaderAction';
import type { DashboardsPageHeaderState } from '../../state/DashboardsPageHeaderState';

export default class FilterDashboardGroupsAction extends AbstractDashboardsPageHeaderAction {
  constructor(private readonly filterText: string) {
    super();
  }

  perform(currentState: DashboardsPageHeaderState): DashboardsPageHeaderState {
    const newState = {
      ...currentState,
      dashboardGroupNameFilterText: this.filterText
    };

    return newState;
  }
}
