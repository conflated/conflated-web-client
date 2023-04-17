import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import ChartAreaStateFactory from '../../../../../state/ChartAreaStateFactory';
import { Chart } from '../../../../../../chart/model/state/Chart';

export default class ChangeXAxisScrollPositionForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly chart: Chart,
    private readonly xAxisScrollPosition: number
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.chart.xAxisScrollPosition = this.xAxisScrollPosition;
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, this.chart);
  }
}
