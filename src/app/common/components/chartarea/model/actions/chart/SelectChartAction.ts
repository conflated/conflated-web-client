import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { ChartAreaPageStateNamespace } from '../../state/types/ChartAreaPageStateNamespace';
import type { Chart } from '../../../chart/model/state/Chart';
import { nullChart } from '../../state/createChartAreaStateReducer';

export default class SelectChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly chart: Chart) {
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
