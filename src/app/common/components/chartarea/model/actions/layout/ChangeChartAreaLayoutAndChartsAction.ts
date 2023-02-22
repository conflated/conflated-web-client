import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { Chart } from '../../../chart/model/state/Chart';
import type { Layout } from '../../state/types/Layout';
import type { ChartAreaPageStateNamespace } from '../../state/types/ChartAreaPageStateNamespace';

export default class ChangeChartAreaLayoutAndChartsAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaPageStateNamespace,
    private readonly layout: Layout,
    private readonly charts: Chart[]
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const newState = {
      ...currentState,
      layout: this.layout,
      charts: this.charts,
      selectedChart: this.charts[0]
    };

    return newState;
  }
}
