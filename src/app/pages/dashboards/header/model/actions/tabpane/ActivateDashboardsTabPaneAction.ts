import AbstractDashboardsPageHeaderAction from '../AbstractDashboardsPageHeaderAction';
import type { DashboardsPageHeaderState } from '../../state/DashboardsPageHeaderState';

export default class ActivateDashboardsTabPaneAction extends AbstractDashboardsPageHeaderAction {
  constructor(private readonly tabPane: 'ALL' | 'FAVORITES') {
    super();
  }

  perform(currentState: DashboardsPageHeaderState): DashboardsPageHeaderState {
    const newState = {
      ...currentState,
      activeDashboardsTabPane: this.tabPane
    };

    return newState;
  }
}
