import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { ChartAreaPageStateNamespace } from '../../../state/namespace/ChartAreaPageStateNamespace';
import type { Chart } from '../../../../chart/model/state/Chart';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import ChartAreaStateUpdater from '../../../state/utils/ChartAreaStateUpdater';

export default class SetSelectedDataPointIndexForChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaPageStateNamespace,
    private readonly chart: Chart,
    private readonly selectedDataPointIndex: number | undefined
  ) {
    super(stateNamespace);
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
    this.chart.selectedDataPointIndex = this.selectedDataPointIndex;
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, this.chart);
  }
}
