import AbstractDashboardsPageHeaderAction from '../AbstractDashboardsPageHeaderAction';
import type { DashboardsPageHeaderState } from '../../state/DashboardsPageHeaderState';

export default class SetHeaderDelayedHideTimeoutIdAction extends AbstractDashboardsPageHeaderAction {
  constructor(private readonly timeoutId: ReturnType<typeof setTimeout>) {
    super();
  }

  perform(currentState: DashboardsPageHeaderState): DashboardsPageHeaderState {
    clearTimeout(currentState.dashboardsHeaderDelayedHideTimeoutId);

    const newState = {
      ...currentState,
      dashboardsHeaderDelayedHideTimeoutId: this.timeoutId
    };

    return newState;
  }
}
