import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { Chart } from '../../../../chart/model/state/Chart';
import type { ChartAreaPageStateNamespace } from '../../../state/namespace/ChartAreaPageStateNamespace';
import type { DataPoint } from '../../../../chart/model/state/types/DataPoint';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import ChartAreaStateUpdater from '../../../state/utils/ChartAreaStateUpdater';

export default class SelectChartDataPointAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaPageStateNamespace,
    private readonly chart: Chart,
    private readonly dataPoint: DataPoint
  ) {
    super(stateNamespace);
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
    this.chart.selectDataPoint(this.dataPoint);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, this.chart);
  }
}
