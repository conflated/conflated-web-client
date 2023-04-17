import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { ChartAreaStateNamespace } from '../../state/types/ChartAreaStateNamespace';
import { GridItem } from '../../state/types/GridItem';

export default class ChangeChartAreaLayoutAndStorePreviousLayoutAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly layout: GridItem[]) {
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
