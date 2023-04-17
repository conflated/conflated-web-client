import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { Chart } from '../../../../chart/model/state/Chart';
import type { ChartAreaStateNamespace } from '../../../state/types/ChartAreaStateNamespace';
import type { DataPoint } from '../../../../chart/model/state/types/DataPoint';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import ChartAreaStateFactory from '../../../state/ChartAreaStateFactory';

export default class SelectChartDataPointAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly chart: Chart,
    private readonly dataPoint: DataPoint
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.chart.selectDataPoint(this.dataPoint);
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, this.chart);
  }
}
