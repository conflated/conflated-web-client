import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { Chart } from '../../../chart/model/state/Chart';
import type { Layout } from '../../state/types/Layout';
import type { ChartAreaStateNamespace } from '../../state/types/ChartAreaStateNamespace';
import { nullChart } from '../../state/createChartAreaStateReducer';

export default class ChangeChartAreaLayoutAndChartsAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
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
      selectedChart: nullChart
    };

    return newState;
  }
}
