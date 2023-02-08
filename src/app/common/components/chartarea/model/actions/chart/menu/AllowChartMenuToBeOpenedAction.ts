import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { Chart } from '../../../../chart/model/state/Chart';
import type { ChartAreaPageStateNamespace } from '../../../state/namespace/ChartAreaPageStateNamespace';
import ChartAreaStateUpdater from '../../../state/utils/ChartAreaStateUpdater';

export default class AllowChartMenuToBeOpenedAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.chart.menuConfirmationType = undefined;
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, this.chart);
  }
}
