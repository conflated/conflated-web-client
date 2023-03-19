import { Controller } from 'oo-redux-utils2';
import type { Chart } from '../../model/state/Chart';
import type { ChartAreaStateNamespace } from '../../../model/state/types/ChartAreaStateNamespace';
import DrillUpChartAction from '../../../model/actions/chart/drill/DrillUpChartAction';
import store from '../../../../../../../store/store';

class DrillUpIconController extends Controller<ChartAreaStateNamespace> {
  getActionDispatchers = (stateNamespace: ChartAreaStateNamespace) => ({
    drillUpChart: (chart: Chart) => {
      this.dispatch(new DrillUpChartAction(stateNamespace, chart));
    }
  });
}

export const controller = new DrillUpIconController(store.dispatch);
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
