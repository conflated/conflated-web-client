import PauseDashboardsSlideShowAction from './PauseDashboardsSlideShowAction';
import PlayDashboardsSlideShowAction from './PlayDashboardsSlideShowAction';
import type { DashboardsState } from '../../state/DashboardsState';
import AbstractDashboardsPageDispatchingAction from '../AbstractDashboardsPageDispatchingAction';

export default class ToggleDashboardsSlideShowPlayAction extends AbstractDashboardsPageDispatchingAction {
  performActionAndReturnNewState(currentState: DashboardsState): DashboardsState {
    if (currentState.isDashboardsSlideShowPlaying) {
      return this.performAction(new PauseDashboardsSlideShowAction(), currentState);
    }

    return this.performAction(new PlayDashboardsSlideShowAction(this.dispatchAction), currentState);
  }
}
