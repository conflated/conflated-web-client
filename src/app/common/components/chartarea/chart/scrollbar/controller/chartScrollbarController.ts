import { Controller } from 'oo-redux-utils2';
import type { ChartAreaStateNamespace } from '../../../model/state/types/ChartAreaStateNamespace';
import ChangeXAxisScrollPositionForSelectedChartAction from '../../../model/actions/chart/xaxis/ChangeXAxisScrollPositionForSelectedChartAction';
import store from '../../../../../../../store/store';
import { Chart } from '../../model/state/Chart';

class ChartScrollbarController extends Controller<ChartAreaStateNamespace> {
  getActionDispatchers = (stateNamespace: ChartAreaStateNamespace) => ({
    changeXAxisScrollPosition: (chart: Chart, xAxisScrollPosition: number) =>
      this.dispatch(new ChangeXAxisScrollPositionForSelectedChartAction(stateNamespace, chart, xAxisScrollPosition))
  });
}

export const controller = new ChartScrollbarController(store.dispatch);
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
