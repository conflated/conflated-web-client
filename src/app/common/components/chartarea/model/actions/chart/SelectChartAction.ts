import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { Chart } from '../../../chart/model/state/Chart';
import { nullChart } from '../../state/createChartAreaStateReducer';
import { ChartAreaStateNamespace } from '../../state/types/ChartAreaStateNamespace';

export default class SelectChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const newState = {
      ...currentState,
      selectedChart: currentState.selectedChart === this.chart ? nullChart : this.chart
    };

    return newState;
  }
}
