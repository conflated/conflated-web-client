import ShowNextDashboardInSlideShowAction from './ShowNextDashboardInSlideShowAction';
import Utils from '../../../../../common/model/state/utils/Utils';
import Constants from '../../../../../common/Constants';
import AbstractDashboardsPageDispatchingAction from '../AbstractDashboardsPageDispatchingAction';
import type { DashboardsState } from '../../state/DashboardsState';

export default class PlayDashboardsSlideShowAction extends AbstractDashboardsPageDispatchingAction {
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
        () => this.dispatchAction(new ShowNextDashboardInSlideShowAction()),
        dashboardSlideChangeIntervalInMillis
      )
    };

    return newState;
  }
}
