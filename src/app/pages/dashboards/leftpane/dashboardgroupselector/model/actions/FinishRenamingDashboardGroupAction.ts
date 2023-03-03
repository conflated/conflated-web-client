import AbstractDashboardGroupSelectorAction from './AbstractDashboardGroupSelectorAction';
import { DashboardGroup } from '../../../../model/state/types/DashboardGroup';
import { DashboardGroupSelectorState } from '../state/DashboardGroupSelectorState';

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
