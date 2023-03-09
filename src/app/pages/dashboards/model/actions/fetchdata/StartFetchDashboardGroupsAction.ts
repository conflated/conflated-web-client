import { Inject } from 'noicejs';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';
import type { DashboardsPageState } from '../../state/DashboardsPageState';
import type { DashboardGroupsService } from '../../service/DashboardGroupsService';
import type { DashboardGroup } from '../../state/types/DashboardGroup';
import ShowDashboardGroupAction from '../show/ShowDashboardGroupAction';

class FinishFetchDashboardGroupsAction extends AbstractDashboardsPageAction {
  constructor(private readonly dashboardGroups: DashboardGroup[]) {
    super();
  }

  perform(currentState: DashboardsPageState): DashboardsPageState {
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

  perform(currentState: DashboardsPageState): DashboardsPageState {
    this.dashboardsService.fetchDashboardGroups().then((dashboardGroups: DashboardGroup[]) => {
      this.dispatch(new FinishFetchDashboardGroupsAction(dashboardGroups));
      this.dispatch(new ShowDashboardGroupAction(dashboardGroups[0]));
    });

    const newState = {
      ...currentState,
      isFetchingDashboardGroups: true
    };

    return newState;
  }
}

export default StartFetchDashboardGroupsAction;
