import { Inject } from 'noicejs';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';
import type { DashboardsState } from '../../state/DashboardsState';
import type { DashboardGroupsService } from '../../service/DashboardGroupsService';
import type { DashboardGroup } from '../../state/entities/DashboardGroup';

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
};

@Inject('dashboardsService')
class StartFetchDashboardGroupsAction extends AbstractDashboardsPageAction {
  readonly dashboardsService: DashboardGroupsService;

  constructor({ dashboardsService }: ConstructorArgs) {
    super();
    this.dashboardsService = dashboardsService;
  }

  perform(currentState: DashboardsState): DashboardsState {
    this.dashboardsService
      .fetchDashboardGroups()
      .then((dashboardGroups: DashboardGroup[]) =>
        this.dispatch(new FinishFetchDashboardGroupsAction(dashboardGroups))
      );

    const newState = {
      ...currentState,
      isFetchingDashboardGroups: true
    };

    return newState;
  }
}

export default StartFetchDashboardGroupsAction;
