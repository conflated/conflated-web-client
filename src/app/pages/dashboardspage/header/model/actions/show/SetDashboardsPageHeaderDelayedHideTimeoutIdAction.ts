import AbstractDashboardsPageHeaderAction from '../AbstractDashboardsPageHeaderAction';
import type { DashboardsPageHeaderState } from '../../state/DashboardsPageHeaderState';

export default class SetDashboardsPageHeaderDelayedHideTimeoutIdAction extends AbstractDashboardsPageHeaderAction {
  constructor(private readonly timeoutId: ReturnType<typeof setTimeout>) {
    super();
  }

  performActionAndReturnNewState(currentState: DashboardsPageHeaderState): DashboardsPageHeaderState {
    clearTimeout(currentState.dashboardsHeaderDelayedHideTimeoutId);

    const newState = {
      ...currentState,
      dashboardsHeaderDelayedHideTimeoutId: this.timeoutId
    };

    return newState;
  }
}
