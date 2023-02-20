import ShowNextDashboardInSlideShowAction from './ShowNextDashboardInSlideShowAction';
import Utils from '../../../../../common/utils/Utils';
import Constants from '../../../../../common/Constants';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';
import type { DashboardsState } from '../../state/DashboardsState';

export default class PlayDashboardsSlideShowAction extends AbstractDashboardsPageAction {
  perform(currentState: DashboardsState): DashboardsState {
    clearInterval(currentState.dashboardsSlideShowIntervalId);

    const dashboardSlideChangeIntervalInMillis = Utils.secsToMillis(
      Utils.parseIntOrDefault(
        currentState.dashboardSlideChangeIntervalInSecsStr,
        Constants.DEFAULT_SLIDE_CHANGE_INTERVAL_IN_SECS
      )
    );

    const newState = {
      ...currentState,
      isDashboardsSlideShowPlaying: true,
      dashboardsSlideShowIntervalId: setInterval(
        () => this.dispatch(new ShowNextDashboardInSlideShowAction()),
        dashboardSlideChangeIntervalInMillis
      )
    };

    return newState;
  }
}
