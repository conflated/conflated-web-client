import AbstractDashboardsPageHeaderAction from './AbstractDashboardsPageHeaderAction';
import type { DashboardsPageHeaderState } from '../state/DashboardsPageHeaderState';
import ShowDashboardsPageHeaderAction from './ShowDashboardsPageHeaderAction';
import HideDashboardsPageHeaderAction from './HideDashboardsPageHeaderAction';
import Constants from '../../../../../common/Constants';
import SetDashboardsPageHeaderDelayedHideTimeoutIdAction from './SetDashboardsPageHeaderDelayedHideTimeoutIdAction';

export default class ShowDashboardsPageHeaderBrieflyAction extends AbstractDashboardsPageHeaderAction {
  perform(currentState: DashboardsPageHeaderState): DashboardsPageHeaderState {
    this.dispatchAfterThis(new ShowDashboardsPageHeaderAction());

    const headerDelayedHideTimeoutId = setTimeout(
      () => this.dispatch(new HideDashboardsPageHeaderAction()),
      Constants.SHOW_DASHBOARDS_HEADER_BRIEFLY_DURATION_IN_MILLIS
    );

    this.dispatchAfterThis(new SetDashboardsPageHeaderDelayedHideTimeoutIdAction(headerDelayedHideTimeoutId));
    return currentState;
  }
}
