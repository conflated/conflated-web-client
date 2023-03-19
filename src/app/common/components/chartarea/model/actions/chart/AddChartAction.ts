import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { Chart } from '../../../chart/model/state/Chart';
import type { Layout } from '../../state/types/Layout';
import type { ChartAreaStateNamespace } from '../../state/types/ChartAreaStateNamespace';

export default class AddChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly chart: Chart, private readonly layout: Layout) {
    super(stateNamespace);
    this.chart = chart;
    this.layout = layout;
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const newState = {
      ...currentState,
      layout: this.layout,
      charts: [...currentState.charts, this.chart]
    };

    return newState;
  }
}
