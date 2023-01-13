import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import type { Chart } from '../../../../../chart/model/state/Chart';
import type { ChartAreaPageStateNamespace } from '../../../../state/namespace/ChartAreaPageStateNamespace';
import ChartAreaStateUpdater from '../../../../state/utils/ChartAreaStateUpdater';

export default class HideChartMenuClearOrDeleteConfirmationAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
    this.chart.menuConfirmationType = 'none';
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, this.chart);
  }
}
