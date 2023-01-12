import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { Chart } from '../../../chart/model/state/Chart';
import type { Layout } from '../../state/types/Layout';
import type { ChartAreaPageStateNamespace } from '../../state/namespace/ChartAreaPageStateNamespace';

export default class AddChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaPageStateNamespace,
    private readonly chart: Chart,
    private readonly layout: Layout
  ) {
    super(stateNamespace);
    this.chart = chart;
    this.layout = layout;
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
    const newState = {
      ...currentState,
      layout: this.layout,
      charts: [...currentState.charts, this.chart]
    };

    return newState;
  }
}
