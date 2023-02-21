import type { DashboardsState } from '../../state/DashboardsState';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';
import type { DashboardGroup } from '../../state/types/DashboardGroup';
import ChangeSelectedDashboardGroupAction from '../changeselected/ChangeSelectedDashboardGroupAction';
import ChangeChartAreaLayoutAndChartsAction from '../../../../../common/components/chartarea/model/actions/layout/ChangeChartAreaLayoutAndChartsAction';
import StartFetchDataForOtherChartsAction from '../../../../../common/components/chartarea/model/actions/chart/fetchdata/StartFetchDataForOtherChartsAction';
import diContainer from '../../../../../../di/diContainer';

export default class ShowDashboardGroupAction extends AbstractDashboardsPageAction {
  constructor(private readonly dashboardGroup: DashboardGroup | undefined) {
    super();
  }

  perform(currentState: DashboardsState): DashboardsState {
    if (this.dashboardGroup) {
      this.dispatchAfterThis(new ChangeSelectedDashboardGroupAction(this.dashboardGroup));
      const newSelectedDashboard = this.dashboardGroup.dashboards?.[0];

      if (newSelectedDashboard) {
        this.dispatchAfterThis(
          new ChangeChartAreaLayoutAndChartsAction(
            'dashboardsPage',
            newSelectedDashboard.layout,
            newSelectedDashboard.charts
          )
        );

        this.dispatchAfterThisWithDi(StartFetchDataForOtherChartsAction, diContainer, {
          pageStateNamespace: 'dashboardsPage',
          chart: null
        });
      }
    }

    return currentState;
  }
}
