import AbstractDashboardsPageHeaderAction from '../AbstractDashboardsPageHeaderAction';
import type { DashboardsPageHeaderState } from '../../state/DashboardsPageHeaderState';

export default class HideDashboardsPageHeaderAction extends AbstractDashboardsPageHeaderAction {
  performActionAndReturnNewState(currentState: DashboardsPageHeaderState): DashboardsPageHeaderState {
    const newState = {
      ...currentState,
      shouldShowDashboardsHeader: false
    };

    return newState;
  }
}
