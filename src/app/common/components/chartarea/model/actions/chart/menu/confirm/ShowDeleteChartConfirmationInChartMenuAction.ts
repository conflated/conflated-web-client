import type { ChartAreaState } from '../../../../state/ChartAreaState';
import type { Chart } from '../../../../../chart/model/state/Chart';
import type { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';
import ChartAreaStateFactory from '../../../../state/utils/ChartAreaStateFactory';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';

export default class ShowDeleteChartConfirmationInChartMenuAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.chart.menuConfirmationType = 'delete';
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, this.chart);
  }
}
