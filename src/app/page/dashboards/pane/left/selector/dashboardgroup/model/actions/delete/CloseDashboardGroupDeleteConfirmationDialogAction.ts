import AbstractDashboardGroupSelectorAction from '../AbstractDashboardGroupSelectorAction';
import { DashboardGroupSelectorState } from '../../state/DashboardGroupSelectorState';

export default class CloseDashboardGroupDeleteConfirmationDialogAction extends AbstractDashboardGroupSelectorAction {
  perform(currentState: DashboardGroupSelectorState): DashboardGroupSelectorState {
    return {
      ...currentState,
      dashboardGroupToBeDeleted: undefined
    };
  }
}
