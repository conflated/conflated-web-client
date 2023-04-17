import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { ChartAreaStateNamespace } from '../../../state/types/ChartAreaStateNamespace';
import type { Chart } from '../../../../chart/model/state/Chart';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import ChartAreaStateFactory from '../../../state/ChartAreaStateFactory';

export default class SetSelectedDataPointIndexForChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly chart: Chart,
    private readonly selectedDataPointIndex: number | undefined
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.chart.selectedDataPointIndex = this.selectedDataPointIndex;
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, this.chart);
  }
}
