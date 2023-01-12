import { NamespacedControllerFactory } from 'oo-redux-utils';
import type { ChartAreaPageStateNamespace } from '../../../model/state/namespace/ChartAreaPageStateNamespace';
import ChangeXAxisScrollPositionForSelectedChartAction from '../../../model/actions/chart/selected/change/scrollposition/ChangeXAxisScrollPositionForSelectedChartAction';

export default class ChartScrollbarControllerFactory extends NamespacedControllerFactory<ChartAreaPageStateNamespace> {
  changeXAxisScrollPosition(xAxisScrollPosition: number) {
    this.dispatchAction(new ChangeXAxisScrollPositionForSelectedChartAction(this.stateNamespace, xAxisScrollPosition));
  }

  createController() {
    return {
      changeXAxisScrollPosition: this.changeXAxisScrollPosition
    };
  }
}
