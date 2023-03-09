import Utils from '../../../../../common/utils/Utils';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';
import type { DashboardsPageState } from '../../state/DashboardsPageState';

export default class ChangeDashboardSlideChangeIntervalAction extends AbstractDashboardsPageAction {
  constructor(private readonly dashboardSlideChangeIntervalInSecsStr: string) {
    super();
  }

  perform(currentState: DashboardsPageState): DashboardsPageState {
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
