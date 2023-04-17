import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { Chart } from '../../../chart/model/state/Chart';
import type { ChartAreaStateNamespace } from '../../state/types/ChartAreaStateNamespace';
import { GridItem } from '../../state/types/GridItem';

export default class AddChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly chart: Chart,
    private readonly layout: GridItem[]
  ) {
    super(stateNamespace);
    this.chart = chart;
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    return {
      ...currentState,
      layout: this.layout,
      charts: [...currentState.charts, this.chart]
    };
  }
}
