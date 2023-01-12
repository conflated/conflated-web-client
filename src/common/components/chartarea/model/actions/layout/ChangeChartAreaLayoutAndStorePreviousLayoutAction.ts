import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { Layout } from '../../state/types/Layout';
import type { ChartAreaPageStateNamespace } from '../../state/namespace/ChartAreaPageStateNamespace';

export default class ChangeChartAreaLayoutAndStorePreviousLayoutAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly layout: Layout) {
    super(stateNamespace);
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
    let newState;

    if (this.layout.length > 0) {
      newState = {
        ...currentState,
        previousLayout: currentState.layout,
        layout: this.layout
      };
    } else {
      newState = {
        ...currentState,
        layout: currentState.previousLayout || []
      };
    }

    return newState;
  }
}
