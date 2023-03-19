import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { Chart } from '../../../../chart/model/state/Chart';
import type { ChartAreaStateNamespace } from '../../../state/types/ChartAreaStateNamespace';

export default class CopyChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    return {
      ...currentState,
      copiedChart: this.chart
    };
  }
}
