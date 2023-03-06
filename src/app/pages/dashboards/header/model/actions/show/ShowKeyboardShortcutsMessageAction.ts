import AbstractDashboardsPageHeaderAction from '../AbstractDashboardsPageHeaderAction';
import type { DashboardsPageHeaderState } from '../../state/DashboardsPageHeaderState';

export default class ShowKeyboardShortcutsMessageAction extends AbstractDashboardsPageHeaderAction {
  perform(currentState: DashboardsPageHeaderState): DashboardsPageHeaderState {
    return {
      ...currentState,
      shouldShowKeyboardShortcutsMessage: true
    };
  }
}
