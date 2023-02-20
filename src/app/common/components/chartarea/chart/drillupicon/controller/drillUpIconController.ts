import { Controller } from 'oo-redux-utils2';
import type { Chart } from '../../model/state/Chart';
import type { ChartAreaPageStateNamespace } from '../../../model/state/types/ChartAreaPageStateNamespace';
import DrillUpChartAction from '../../../model/actions/chart/drill/DrillUpChartAction';
import store from '../../../../../../../store/store';

class DrillUpIconController extends Controller<ChartAreaPageStateNamespace> {
  getActionDispatchers = (pageStateNamespace: ChartAreaPageStateNamespace) => ({
    drillUpChart: (chart: Chart) => {
      this.dispatch(new DrillUpChartAction(pageStateNamespace, chart));
    }
  });
}

export const controller = new DrillUpIconController(store.dispatch);
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
