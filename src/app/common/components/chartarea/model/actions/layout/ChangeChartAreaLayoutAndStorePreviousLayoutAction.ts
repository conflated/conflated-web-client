import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { GridItems } from '../../state/types/GridItems';
import type { ChartAreaStateNamespace } from '../../state/types/ChartAreaStateNamespace';

export default class ChangeChartAreaLayoutAndStorePreviousLayoutAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly layout: GridItems) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
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
