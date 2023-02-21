import type { DashboardsState } from '../../state/DashboardsState';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';
import ChangeChartAreaLayoutAndChartsAction from '../../../../../common/components/chartarea/model/actions/layout/ChangeChartAreaLayoutAndChartsAction';
import StartFetchDataForOtherChartsAction from '../../../../../common/components/chartarea/model/actions/chart/fetchdata/StartFetchDataForOtherChartsAction';
import diContainer from '../../../../../../di/diContainer';
import { Dashboard } from '../../state/types/Dashboard';
import ChangeSelectedDashboardAction from '../changeselected/ChangeSelectedDashboardAction';

export default class ShowDashboardAction extends AbstractDashboardsPageAction {
  constructor(private readonly dashboard: Dashboard | undefined) {
    super();
  }

  perform(currentState: DashboardsState): DashboardsState {
    if (this.dashboard) {
      this.dispatchAfterThis(new ChangeSelectedDashboardAction(this.dashboard));

      this.dispatchAfterThis(
        new ChangeChartAreaLayoutAndChartsAction('dashboardsPage', this.dashboard.layout, this.dashboard.charts)
      );

      this.dispatchAfterThisWithDi(StartFetchDataForOtherChartsAction, diContainer, {
        pageStateNamespace: 'dashboardsPage',
        chart: null
      });
    }

    return currentState;
  }
}
