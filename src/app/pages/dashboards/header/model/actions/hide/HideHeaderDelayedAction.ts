import AbstractDashboardsPageHeaderAction from '../AbstractDashboardsPageHeaderAction';
import type { DashboardsPageHeaderState } from '../../state/DashboardsPageHeaderState';
import HideHeaderAction from './HideHeaderAction';
import SetHeaderDelayedHideTimeoutIdAction from './SetHeaderDelayedHideTimeoutIdAction';

export default class HideHeaderDelayedAction extends AbstractDashboardsPageHeaderAction {
  constructor(private readonly dashboardHeaderHideDelayInMillis: number) {
    super();
  }

  perform(currentState: DashboardsPageHeaderState): DashboardsPageHeaderState {
    const timeoutId = setTimeout(() => this.dispatch(new HideHeaderAction()), this.dashboardHeaderHideDelayInMillis);

    this.dispatch(new SetHeaderDelayedHideTimeoutIdAction(timeoutId));
    return currentState;
  }
}
