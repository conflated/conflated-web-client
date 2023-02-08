import _ from 'lodash';
import AbstractDashboardsPageHeaderAction from '../AbstractDashboardsPageHeaderAction';
import type { DashboardsPageHeaderState } from '../../state/DashboardsPageHeaderState';

export default class CancelDelayedDashboardsPageHeaderHideAction extends AbstractDashboardsPageHeaderAction {
  perform(currentState: DashboardsPageHeaderState): DashboardsPageHeaderState {
    clearTimeout(currentState.dashboardsHeaderDelayedHideTimeoutId);

    const newState = {
      ...currentState,
      dashboardsHeaderDelayedHideTimeoutId: setTimeout(() => _.noop(), Number.MAX_SAFE_INTEGER)
    };

    return newState;
  }
}
