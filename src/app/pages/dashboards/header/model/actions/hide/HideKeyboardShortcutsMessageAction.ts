import AbstractDashboardsPageHeaderAction from '../AbstractDashboardsPageHeaderAction';
import type { DashboardsPageHeaderState } from '../../state/DashboardsPageHeaderState';

export default class HideKeyboardShortcutsMessageAction extends AbstractDashboardsPageHeaderAction {
  perform(currentState: DashboardsPageHeaderState): DashboardsPageHeaderState {
    return {
      ...currentState,
      shouldShowKeyboardShortcutsMessage: false
    };
  }
}
