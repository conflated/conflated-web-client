import type { DashboardsPageState } from '../../state/DashboardsPageState';
import AbstractDashboardsPageAction from '../AbstractDashboardsPageAction';
import type { DashboardGroup } from '../../state/types/DashboardGroup';
import SelectDashboardGroupAction from '../select/SelectDashboardGroupAction';
import ChangeChartAreaLayoutAndChartsAction from '../../../../../common/components/chartarea/model/actions/layout/ChangeChartAreaLayoutAndChartsAction';
import StartFetchDataForOtherChartsAction from '../../../../../common/components/chartarea/model/actions/chart/fetchdata/StartFetchDataForOtherChartsAction';
import diContainer from '../../../../../../di/diContainer';

export default class ShowDashboardGroupAction extends AbstractDashboardsPageAction {
  constructor(private readonly dashboardGroup: DashboardGroup | undefined) {
    super();
  }

  perform(currentState: DashboardsPageState): DashboardsPageState {
    if (this.dashboardGroup) {
      this.dispatch(new SelectDashboardGroupAction(this.dashboardGroup));
      const newSelectedDashboard = this.dashboardGroup.dashboards?.[0];

      if (newSelectedDashboard) {
        this.dispatch(
          new ChangeChartAreaLayoutAndChartsAction(
            'dashboardsPage',
            newSelectedDashboard.layout,
            newSelectedDashboard.charts
          )
        );

        this.dispatchWithDi(StartFetchDataForOtherChartsAction, diContainer, {
          stateNamespace: 'dashboardsPage',
          chart: null
        });
      }
    }

    return currentState;
  }
}
