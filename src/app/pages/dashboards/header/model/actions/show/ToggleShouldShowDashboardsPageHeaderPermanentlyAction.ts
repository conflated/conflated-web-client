import AbstractDashboardsPageHeaderAction from '../AbstractDashboardsPageHeaderAction';
import type { DashboardsPageHeaderState } from '../../state/DashboardsPageHeaderState';

export default class ToggleShouldShowDashboardsPageHeaderPermanentlyAction extends AbstractDashboardsPageHeaderAction {
  performActionAndReturnNewState(currentState: DashboardsPageHeaderState): DashboardsPageHeaderState {
    const newState = {
      ...currentState,
      shouldShowDashboardsHeaderPermanently: !currentState.shouldShowDashboardsHeaderPermanently
    };

    return newState;
  }
}
