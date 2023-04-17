import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import ChartAreaStateFactory from '../../../../../state/ChartAreaStateFactory';
import type { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import { Chart } from '../../../../../../chart/model/state/Chart';

export default class AddChartFilterToSelectedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    selectedChart.filters.addChartFilter(this.chart);
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, selectedChart);
  }
}
