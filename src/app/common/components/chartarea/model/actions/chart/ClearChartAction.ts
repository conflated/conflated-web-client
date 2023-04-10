import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { Chart } from '../../../chart/model/state/Chart';
import type { ChartAreaStateNamespace } from '../../state/types/ChartAreaStateNamespace';
import ChartFactory from '../../../chart/model/state/ChartFactory';

export default class ClearChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { charts } = currentState;
    const emptyChart = ChartFactory.createChart();
    emptyChart.id = this.chart.id;

    return {
      ...currentState,
      charts: charts.map((chart) => (chart === this.chart ? emptyChart : chart))
    };
  }
}
