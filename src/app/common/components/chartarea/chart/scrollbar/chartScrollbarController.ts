import type { ChartAreaPageStateNamespace } from '../../model/state/types/ChartAreaPageStateNamespace';
import ChangeXAxisScrollPositionForSelectedChartAction from '../../model/actions/chart/selected/change/scrollposition/ChangeXAxisScrollPositionForSelectedChartAction';
import Controller from '../../../../../../Controller';
import store from '../../../../../../store/store';

class ChartScrollbarController extends Controller<ChartAreaPageStateNamespace> {
  getActionDispatchers(stateNamespace: ChartAreaPageStateNamespace) {
    return {
      changeXAxisScrollPosition: (xAxisScrollPosition: number) =>
        this.dispatch(new ChangeXAxisScrollPositionForSelectedChartAction(stateNamespace, xAxisScrollPosition))
    };
  }
}

export const controller = new ChartScrollbarController(store.dispatch);
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
