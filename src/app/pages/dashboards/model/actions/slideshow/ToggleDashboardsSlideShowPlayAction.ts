import PauseDashboardsSlideShowAction from './PauseDashboardsSlideShowAction';
import PlayDashboardsSlideShowAction from './PlayDashboardsSlideShowAction';
import type { DashboardsPageState } from '../../state/DashboardsPageState';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';

export default class ToggleDashboardsSlideShowPlayAction extends AbstractDashboardsPageAction {
  perform(currentState: DashboardsPageState): DashboardsPageState {
    if (currentState.isDashboardsSlideShowPlaying) {
      return this.performAction(new PauseDashboardsSlideShowAction(), currentState);
    }

    return this.performAction(new PlayDashboardsSlideShowAction(), currentState);
  }
}
