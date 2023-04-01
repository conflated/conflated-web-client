import AbstractDashboardGroupSelectorAction from '../AbstractDashboardGroupSelectorAction';
import { DashboardGroup } from '../../../../../../../model/state/types/DashboardGroup';
import { DashboardGroupSelectorState } from '../../state/DashboardGroupSelectorState';

export default class CancelRenamingDashboardGroupAction extends AbstractDashboardGroupSelectorAction {
  constructor(private readonly dashboardGroup: DashboardGroup) {
    super();
  }

  perform(currentState: DashboardGroupSelectorState): DashboardGroupSelectorState {
    return {
      ...currentState,
      dashboardGroupToBeRenamed: undefined
    };
  }
}
