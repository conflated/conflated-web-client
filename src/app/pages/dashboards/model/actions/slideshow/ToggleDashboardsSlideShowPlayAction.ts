import PauseDashboardsSlideShowAction from './PauseDashboardsSlideShowAction';
import PlayDashboardsSlideShowAction from './PlayDashboardsSlideShowAction';
import type { DashboardsState } from '../../state/DashboardsState';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';

export default class ToggleDashboardsSlideShowPlayAction extends AbstractDashboardsPageAction {
  perform(currentState: DashboardsState): DashboardsState {
    if (currentState.isDashboardsSlideShowPlaying) {
      return this.performAction(new PauseDashboardsSlideShowAction(), currentState);
    }

    return this.performAction(new PlayDashboardsSlideShowAction(), currentState);
  }
}
