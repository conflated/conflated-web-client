import type { DashboardsPageState } from '../../state/DashboardsPageState';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';
import ChangeChartAreaLayoutAndChartsAction from '../../../../../common/components/chartarea/model/actions/layout/ChangeChartAreaLayoutAndChartsAction';
import StartFetchDataForOtherChartsAction from '../../../../../common/components/chartarea/model/actions/chart/fetchdata/StartFetchDataForOtherChartsAction';
import diContainer from '../../../../../../di/diContainer';
import { Dashboard } from '../../state/types/Dashboard';
import SelectDashboardAction from '../select/SelectDashboardAction';

export default class ShowDashboardAction extends AbstractDashboardsPageAction {
  constructor(private readonly dashboard: Dashboard | undefined) {
    super();
  }

  perform(currentState: DashboardsPageState): DashboardsPageState {
    if (this.dashboard) {
      this.dispatch(new SelectDashboardAction(this.dashboard));

      this.dispatch(
        new ChangeChartAreaLayoutAndChartsAction('dashboardsPage', this.dashboard.layout, this.dashboard.charts)
      );

      this.dispatchWithDi(StartFetchDataForOtherChartsAction, diContainer, {
        stateNamespace: 'dashboardsPage',
        chart: null
      });
    }

    return currentState;
  }
}
