import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { Chart } from '../../../chart/model/state/Chart';
import type { GridItems } from '../../state/types/GridItems';
import type { ChartAreaStateNamespace } from '../../state/types/ChartAreaStateNamespace';
import { nullChart } from '../../state/createChartAreaStateReducer';

export default class ChangeChartAreaLayoutAndChartsAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly layout: GridItems,
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
