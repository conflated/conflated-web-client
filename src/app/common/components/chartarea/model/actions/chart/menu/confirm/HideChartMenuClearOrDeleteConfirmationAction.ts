import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import type { Chart } from '../../../../../chart/model/state/Chart';
import type { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';
import ChartAreaStateUpdater from '../../../../state/utils/ChartAreaStateUpdater';

export default class HideChartMenuClearOrDeleteConfirmationAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.chart.menuConfirmationType = 'none';
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, this.chart);
  }
}
