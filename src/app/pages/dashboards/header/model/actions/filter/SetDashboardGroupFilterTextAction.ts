import AbstractDashboardsPageHeaderAction from '../AbstractDashboardsPageHeaderAction';
import type { DashboardsPageHeaderState } from '../../state/DashboardsPageHeaderState';

export default class SetDashboardGroupFilterTextAction extends AbstractDashboardsPageHeaderAction {
  constructor(private readonly filterText: string) {
    super();
  }

  perform(currentState: DashboardsPageHeaderState): DashboardsPageHeaderState {
    const newState = {
      ...currentState,
      dashboardGroupFilterText: this.filterText
    };

    return newState;
  }
}
