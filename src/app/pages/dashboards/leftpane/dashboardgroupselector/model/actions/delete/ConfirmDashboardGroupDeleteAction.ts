import AbstractDashboardGroupSelectorAction from '../AbstractDashboardGroupSelectorAction';
import { DashboardGroupSelectorState } from '../../state/DashboardGroupSelectorState';
import { DashboardGroup } from '../../../../../model/state/types/DashboardGroup';

export default class ConfirmDashboardGroupDeleteAction extends AbstractDashboardGroupSelectorAction {
  constructor(private readonly dashboardGroup?: DashboardGroup) {
    super();
  }

  perform(currentState: DashboardGroupSelectorState): DashboardGroupSelectorState {
    return {
      ...currentState,
      dashboardGroupToBeDeleted: undefined
    };
  }
}
