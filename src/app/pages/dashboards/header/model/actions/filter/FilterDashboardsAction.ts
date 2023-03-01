import AbstractDashboardsPageHeaderAction from '../AbstractDashboardsPageHeaderAction';
import type { DashboardsPageHeaderState } from '../../state/DashboardsPageHeaderState';

export default class FilterDashboardsAction extends AbstractDashboardsPageHeaderAction {
  constructor(private readonly filterText: string) {
    super();
  }

  perform(currentState: DashboardsPageHeaderState): DashboardsPageHeaderState {
    const newState = {
      ...currentState,
      dashboardFilterText: this.filterText
    };

    return newState;
  }
}
