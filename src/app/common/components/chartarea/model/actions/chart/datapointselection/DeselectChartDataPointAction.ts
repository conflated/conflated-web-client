import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { Chart } from '../../../../chart/model/state/Chart';
import type { ChartAreaStateNamespace } from '../../../state/types/ChartAreaStateNamespace';
import type { DataPoint } from '../../../../chart/model/state/types/DataPoint';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import ChartAreaStateUpdater from '../../../state/utils/ChartAreaStateUpdater';

export default class DeselectChartDataPointAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly chart: Chart,
    private readonly dataPoint: DataPoint
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.chart.deselectDataPoint(this.dataPoint);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, this.chart);
  }
}
