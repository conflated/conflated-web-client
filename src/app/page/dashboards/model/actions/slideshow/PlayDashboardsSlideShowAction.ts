import ShowNextDashboardInSlideShowAction from './ShowNextDashboardInSlideShowAction';
import Utils from '../../../../../common/utils/Utils';
import Constants from '../../../../../common/Constants';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';
import type { DashboardsPageState } from '../../state/DashboardsPageState';

export default class PlayDashboardsSlideShowAction extends AbstractDashboardsPageAction {
  perform(currentState: DashboardsPageState): DashboardsPageState {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const screenWakeLockPromise = navigator.wakeLock?.request('screen');

    clearInterval(currentState.dashboardsSlideShowIntervalId);

    const dashboardSlideChangeIntervalInMillis = Utils.secsToMillis(
      Utils.parseIntOrDefault(
        currentState.dashboardSlideChangeIntervalInSecsStr,
        Constants.DEFAULT_SLIDE_CHANGE_INTERVAL_IN_SECS
      )
    );

    const newState = {
      ...currentState,
      screenWakeLockPromise,
      isDashboardsSlideShowPlaying: true,
      dashboardsSlideShowIntervalId: setInterval(
        () => this.dispatch(new ShowNextDashboardInSlideShowAction()),
        dashboardSlideChangeIntervalInMillis
      )
    };

    return newState;
  }
}
