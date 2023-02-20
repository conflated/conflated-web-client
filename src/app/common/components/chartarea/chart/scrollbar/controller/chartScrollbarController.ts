import { Controller } from 'oo-redux-utils2';
import type { ChartAreaPageStateNamespace } from '../../../model/state/types/ChartAreaPageStateNamespace';
import ChangeXAxisScrollPositionForSelectedChartAction from '../../../model/actions/chart/selected/change/scrollposition/ChangeXAxisScrollPositionForSelectedChartAction';
import store from '../../../../../../../store/store';

class ChartScrollbarController extends Controller<ChartAreaPageStateNamespace> {
  getActionDispatchers = (pageStateNamespace: ChartAreaPageStateNamespace) => ({
    changeXAxisScrollPosition: (xAxisScrollPosition: number) =>
      this.dispatch(new ChangeXAxisScrollPositionForSelectedChartAction(pageStateNamespace, xAxisScrollPosition))
  });
}

export const controller = new ChartScrollbarController(store.dispatch);
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
