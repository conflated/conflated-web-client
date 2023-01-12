import type { ChartAreaState } from '../../../../state/ChartAreaState';
import type { Chart } from '../../../../../chart/model/state/Chart';
import type { ChartAreaPageStateNamespace } from '../../../../state/namespace/ChartAreaPageStateNamespace';
import ChartAreaStateUpdater from '../../../../state/utils/ChartAreaStateUpdater';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';

export default class ShowDeleteChartConfirmationInChartMenuAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
    this.chart.menuConfirmationType = 'delete';
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, this.chart);
  }
}
