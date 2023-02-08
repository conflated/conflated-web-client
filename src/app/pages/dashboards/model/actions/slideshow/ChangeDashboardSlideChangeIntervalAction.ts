import Utils from '../../../../../common/model/state/utils/Utils';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';
import type { DashboardsState } from '../../state/DashboardsState';

export default class ChangeDashboardSlideChangeIntervalAction extends AbstractDashboardsPageAction {
  constructor(private readonly dashboardSlideChangeIntervalInSecsStr: string) {
    super();
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
