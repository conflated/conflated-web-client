import { ControllerFactory } from 'oo-redux-utils';
import StartFetchDashboardGroupsAction from '../model/actions/fetchdata/StartFetchDashboardGroupsAction';
import diContainer from '../../diContainer';
import type { Dashboard } from '../model/state/entities/Dashboard';
import ChangeChartAreaLayoutAndChartsAction from '../../common/components/chartarea/model/actions/layout/ChangeChartAreaLayoutAndChartsAction';
import StartFetchDataForOtherChartsAction from '../../common/components/chartarea/model/actions/chart/fetchdata/StartFetchDataForOtherChartsAction';
import type { DashboardGroup } from '../model/state/entities/DashboardGroup';
import ChangeSelectedDashboardGroupAction from '../model/actions/changeselected/ChangeSelectedDashboardGroupAction';
import ChangeSelectedDashboardAction from '../model/actions/changeselected/ChangeSelectedDashboardAction';
import ShowDashboardsPageHeaderAction from '../header/model/actions/show/ShowDashboardsPageHeaderAction';
import HideDashboardsPageHeaderAction from '../header/model/actions/show/HideDashboardsPageHeaderAction';
import Constants from '../../common/Constants';
import SetDashboardsPageHeaderDelayedHideTimeoutIdAction from '../header/model/actions/show/SetDashboardsPageHeaderDelayedHideTimeoutIdAction';

export default class DashboardsPageControllerFactory extends ControllerFactory {
  async startFetchDashboardGroups(): Promise<void> {
    this.dispatchActionWithDi(diContainer, StartFetchDashboardGroupsAction, {});
  }

  showDashboard(dashboard: Dashboard | undefined) {
    if (dashboard) {
      this.dispatchAction(new ChangeSelectedDashboardAction(dashboard));

      this.dispatchAction(
        new ChangeChartAreaLayoutAndChartsAction('dashboardsPage', dashboard.layout, dashboard.charts)
      );

      this.dispatchActionWithDi(diContainer, StartFetchDataForOtherChartsAction, {
        stateNamespace: 'dashboardsPage',
        chart: null
      });
    }
  }

  showDashboardGroup(dashboardGroup: DashboardGroup | undefined) {
    if (dashboardGroup) {
      this.dispatchAction(new ChangeSelectedDashboardGroupAction(dashboardGroup));

      const newSelectedDashboard = dashboardGroup.dashboards?.[0];

      if (newSelectedDashboard) {
        this.dispatchAction(
          new ChangeChartAreaLayoutAndChartsAction(
            'dashboardsPage',
            newSelectedDashboard.layout,
            newSelectedDashboard.charts
          )
        );

        this.dispatchActionWithDi(diContainer, StartFetchDataForOtherChartsAction, {
          stateNamespace: 'dashboardsPage',
          chart: null
        });
      }
    }
  }

  showDashboardsHeaderBriefly() {
    this.dispatchAction(new ShowDashboardsPageHeaderAction());

    const headerDelayedHideTimeoutId = setTimeout(
      () => this.dispatchAction(new HideDashboardsPageHeaderAction()),
      Constants.SHOW_DASHBOARDS_HEADER_BRIEFLY_DURATION_IN_MILLIS
    );

    this.dispatchAction(new SetDashboardsPageHeaderDelayedHideTimeoutIdAction(headerDelayedHideTimeoutId));
  }

  createController() {
    return {
      startFetchDashboardGroups: this.startFetchDashboardGroups,
      showDashboard: this.showDashboard,
      showDashboardGroup: this.showDashboardGroup,
      showDashboardsHeaderBriefly: this.showDashboardsHeaderBriefly
    };
  }
}
