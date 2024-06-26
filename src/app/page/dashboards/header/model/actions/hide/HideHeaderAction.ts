import AbstractDashboardsPageHeaderAction from '../AbstractDashboardsPageHeaderAction';
import type { DashboardsPageHeaderState } from '../../state/DashboardsPageHeaderState';

export default class HideHeaderAction extends AbstractDashboardsPageHeaderAction {
  perform(currentState: DashboardsPageHeaderState): DashboardsPageHeaderState {
    const newState = {
      ...currentState,
      shouldShowDashboardsHeader: false
    };

    return newState;
  }
}
