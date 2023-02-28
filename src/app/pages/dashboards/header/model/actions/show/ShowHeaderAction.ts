import _ from 'lodash';
import AbstractDashboardsPageHeaderAction from '../AbstractDashboardsPageHeaderAction';
import type { DashboardsPageHeaderState } from '../../state/DashboardsPageHeaderState';

export default class ShowHeaderAction extends AbstractDashboardsPageHeaderAction {
  perform(currentState: DashboardsPageHeaderState): DashboardsPageHeaderState {
    clearTimeout(currentState.dashboardsHeaderDelayedHideTimeoutId);

    const newState = {
      ...currentState,
      shouldShowDashboardsHeader: true,
      dashboardsHeaderHideDelayInMillis: 200,
      dashboardsHeaderDelayedHideTimeoutId: setTimeout(() => _.noop(), Number.MAX_SAFE_INTEGER)
    };

    return newState;
  }
}
