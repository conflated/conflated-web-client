import AbstractDashboardsPageHeaderAction from '../AbstractDashboardsPageHeaderAction';
import type { DashboardsPageHeaderState } from '../../state/DashboardsPageHeaderState';

export default class HideDashboardsPageHeaderAction extends AbstractDashboardsPageHeaderAction {
  perform(currentState: DashboardsPageHeaderState): DashboardsPageHeaderState {
    const newState = {
      ...currentState,
      shouldShowDashboardsHeader: false,
      shouldShowKeyboardShortcuts: true
    };

    return newState;
  }
}
