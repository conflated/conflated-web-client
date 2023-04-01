import AbstractDashboardGroupSelectorAction from '../AbstractDashboardGroupSelectorAction';
import { DashboardGroupSelectorState } from '../../state/DashboardGroupSelectorState';
import { DashboardGroup } from '../../../../../../../model/state/types/DashboardGroup';
import RemoveDashboardGroupAction from '../../../../../../../model/actions/remove/RemoveDashboardGroupAction';

export default class ConfirmDashboardGroupDeleteAction extends AbstractDashboardGroupSelectorAction {
  constructor(private readonly dashboardGroup?: DashboardGroup) {
    super();
  }

  perform(currentState: DashboardGroupSelectorState): DashboardGroupSelectorState {
    this.dispatch(new RemoveDashboardGroupAction(this.dashboardGroup));

    return {
      ...currentState,
      dashboardGroupToBeDeleted: undefined
    };
  }
}
