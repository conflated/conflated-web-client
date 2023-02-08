import type { DispatchAction } from 'oo-redux-utils2';
import Utils from '../../../../../common/model/state/utils/Utils';
import AbstractDashboardsPageDispatchingAction from '../AbstractDashboardsPageDispatchingAction';
import type { DashboardsState } from '../../state/DashboardsState';

export default class ChangeDashboardSlideChangeIntervalAction extends AbstractDashboardsPageDispatchingAction {
  constructor(dispatchAction: DispatchAction, private readonly dashboardSlideChangeIntervalInSecsStr: string) {
    super(dispatchAction);
  }

  perform(currentState: DashboardsState): DashboardsState {
    const newDashboardSlideChangeIntervalInSecsStr = Utils.parseIntOrDefault(
      this.dashboardSlideChangeIntervalInSecsStr,
      currentState.dashboardSlideChangeIntervalInSecsStr
    ).toString();

    const newState = {
      ...currentState,
      dashboardSlideChangeIntervalInSecsStr: newDashboardSlideChangeIntervalInSecsStr
    };

    return newState;
  }
}
