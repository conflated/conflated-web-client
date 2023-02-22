import AbstractDashboardsPageHeaderAction from './AbstractDashboardsPageHeaderAction';
import type { DashboardsPageHeaderState } from '../state/DashboardsPageHeaderState';
import HideDashboardsPageHeaderAction from './HideDashboardsPageHeaderAction';
import SetDashboardsPageHeaderDelayedHideTimeoutIdAction from './SetDashboardsPageHeaderDelayedHideTimeoutIdAction';

export default class HideDashboardsHeaderDelayedAction extends AbstractDashboardsPageHeaderAction {
  constructor(private readonly dashboardHeaderHideDelayInMillis: number) {
    super();
  }

  perform(currentState: DashboardsPageHeaderState): DashboardsPageHeaderState {
    const timeoutId = setTimeout(
      () => this.dispatch(new HideDashboardsPageHeaderAction()),
      this.dashboardHeaderHideDelayInMillis
    );

    this.dispatch(new SetDashboardsPageHeaderDelayedHideTimeoutIdAction(timeoutId));
    return currentState;
  }
}
