import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import type { Chart } from '../../../../../chart/model/state/Chart';
import ChartAreaStateFactory from '../../../../state/ChartAreaStateFactory';
import { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';

export default class UpdateChartExportMenuCloseTimeoutIdAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly chart: Chart,
    private readonly timeoutId: ReturnType<typeof setTimeout> | 0
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.chart.exportMenuCloseTimeoutID = this.timeoutId;
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, this.chart);
  }
}
