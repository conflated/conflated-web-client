import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { Chart } from '../../../../chart/model/state/Chart';
import ChartAreaStateFactory from '../../../state/utils/ChartAreaStateFactory';
import { ChartAreaStateNamespace } from '../../../state/types/ChartAreaStateNamespace';

export default class AllowChartMenuToBeOpenedAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.chart.menuConfirmationType = undefined;
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, this.chart);
  }
}
