import AbstractDashboardsPageHeaderAction from '../AbstractDashboardsPageHeaderAction';
import type { DashboardsPageHeaderState } from '../../state/DashboardsPageHeaderState';

export default class ActivateDashboardGroupsTabPaneAction extends AbstractDashboardsPageHeaderAction {
  constructor(private readonly tabPane: 'ALL' | 'FAVORITES') {
    super();
  }

  perform(currentState: DashboardsPageHeaderState): DashboardsPageHeaderState {
    const newState = {
      ...currentState,
      activeDashboardGroupsTabPane: this.tabPane
    };

    return newState;
  }
}
