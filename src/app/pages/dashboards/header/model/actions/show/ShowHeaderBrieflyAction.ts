import AbstractDashboardsPageHeaderAction from '../AbstractDashboardsPageHeaderAction';
import type { DashboardsPageHeaderState } from '../../state/DashboardsPageHeaderState';
import ShowHeaderAction from './ShowHeaderAction';
import HideHeaderAction from '../hide/HideHeaderAction';
import Constants from '../../../../../../common/Constants';
import SetHeaderDelayedHideTimeoutIdAction from '../hide/SetHeaderDelayedHideTimeoutIdAction';

export default class ShowDashboardsPageHeaderBrieflyAction extends AbstractDashboardsPageHeaderAction {
  perform(currentState: DashboardsPageHeaderState): DashboardsPageHeaderState {
    this.dispatch(new ShowHeaderAction());

    const headerDelayedHideTimeoutId = setTimeout(
      () => this.dispatch(new HideHeaderAction()),
      Constants.SHOW_DASHBOARDS_HEADER_BRIEFLY_DURATION_IN_MILLIS
    );

    this.dispatch(new SetHeaderDelayedHideTimeoutIdAction(headerDelayedHideTimeoutId));
    return currentState;
  }
}
