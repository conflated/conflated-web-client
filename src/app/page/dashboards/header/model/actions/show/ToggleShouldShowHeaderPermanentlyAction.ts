import AbstractDashboardsPageHeaderAction from '../AbstractDashboardsPageHeaderAction';
import type { DashboardsPageHeaderState } from '../../state/DashboardsPageHeaderState';

export default class ToggleShouldShowHeaderPermanentlyAction extends AbstractDashboardsPageHeaderAction {
  perform(currentState: DashboardsPageHeaderState): DashboardsPageHeaderState {
    const newState = {
      ...currentState,
      shouldShowDashboardsHeaderPermanently: !currentState.shouldShowDashboardsHeaderPermanently
    };

    return newState;
  }
}
