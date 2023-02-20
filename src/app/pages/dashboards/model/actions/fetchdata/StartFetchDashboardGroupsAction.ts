import { Inject } from 'noicejs';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';
import type { DashboardsState } from '../../state/DashboardsState';
import type { DashboardGroupsService } from '../../service/DashboardGroupsService';
import type { DashboardGroup } from '../../state/types/DashboardGroup';

class FinishFetchDashboardGroupsAction extends AbstractDashboardsPageAction {
  constructor(private readonly dashboardGroups: DashboardGroup[]) {
    super();
  }

  perform(currentState: DashboardsState): DashboardsState {
    const newState = {
      ...currentState,
      dashboardGroups: this.dashboardGroups,
      selectedDashboardGroup: this.dashboardGroups?.[0],
      selectedDashboard: this.dashboardGroups?.[0]?.dashboards?.[0],
      isFetchingDashboardGroups: false
    };

    return newState;
  }
}

type ConstructorArgs = {
  dashboardsService: DashboardGroupsService;
  showDashboardGroup: (dashboardGroup: DashboardGroup | undefined) => void;
};

@Inject('dashboardsService')
class StartFetchDashboardGroupsAction extends AbstractDashboardsPageAction {
  readonly dashboardsService: DashboardGroupsService;

  readonly showDashboardGroup: (dashboardGroup: DashboardGroup | undefined) => void;

  constructor({ dashboardsService, showDashboardGroup }: ConstructorArgs) {
    super();
    this.dashboardsService = dashboardsService;
    this.showDashboardGroup = showDashboardGroup;
  }

  perform(currentState: DashboardsState): DashboardsState {
    this.dashboardsService.fetchDashboardGroups().then((dashboardGroups: DashboardGroup[]) => {
      this.dispatch(new FinishFetchDashboardGroupsAction(dashboardGroups));
      this.showDashboardGroup(dashboardGroups[0]);
    });

    const newState = {
      ...currentState,
      isFetchingDashboardGroups: true
    };

    return newState;
  }
}

export default StartFetchDashboardGroupsAction;
