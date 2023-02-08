import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { ChartAreaPageStateNamespace } from '../../../state/types/ChartAreaPageStateNamespace';
import type { Chart } from '../../../../chart/model/state/Chart';
import ChartAreaStateUpdater from '../../../state/utils/ChartAreaStateUpdater';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';

export default class DrillUpChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.chart.drillUp();
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, this.chart);
  }
}
