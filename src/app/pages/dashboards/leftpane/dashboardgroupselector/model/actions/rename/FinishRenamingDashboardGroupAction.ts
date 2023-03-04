import AbstractDashboardGroupSelectorAction from '../AbstractDashboardGroupSelectorAction';
import { DashboardGroup } from '../../../../../model/state/types/DashboardGroup';
import { DashboardGroupSelectorState } from '../../state/DashboardGroupSelectorState';
import RenameDashboardGroupAction from '../../../../../model/actions/rename/RenameDashboardGroupAction';

export default class FinishRenamingDashboardGroupAction extends AbstractDashboardGroupSelectorAction {
  constructor(private readonly dashboardGroup: DashboardGroup, private readonly newName: string) {
    super();
  }

  perform(currentState: DashboardGroupSelectorState): DashboardGroupSelectorState {
    this.dispatch(new RenameDashboardGroupAction(this.dashboardGroup, this.newName));

    return {
      ...currentState,
      dashboardGroupToBeRenamed: undefined
    };
  }
}
