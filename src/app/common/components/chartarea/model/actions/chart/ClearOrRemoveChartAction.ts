import type { ChartAreaPageStateNamespace } from '../../state/types/ChartAreaPageStateNamespace';
import type { Chart } from '../../../chart/model/state/Chart';
import ClearChartAction from './ClearChartAction';
import DeleteChartAction from './RemoveChartAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import HideChartMenuClearOrDeleteConfirmationAction from './menu/confirm/HideChartMenuClearOrDeleteConfirmationAction';
import AbstractChartAreaAction from '../AbstractChartAreaAction';

export default class ClearOrRemoveChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    let newState;

    if (this.chart.menuConfirmationType === 'clear') {
      newState = this.performAction(new ClearChartAction(this.stateNamespace, this.chart), currentState);
    } else {
      newState = this.performAction(new DeleteChartAction(this.stateNamespace, this.chart), currentState);
    }

    return this.performAction(
      new HideChartMenuClearOrDeleteConfirmationAction(this.stateNamespace, this.chart),
      newState
    );
  }
}
