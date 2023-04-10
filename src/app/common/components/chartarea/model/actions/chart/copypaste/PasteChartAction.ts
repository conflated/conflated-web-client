import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { Chart } from '../../../../chart/model/state/Chart';
import type { ChartAreaStateNamespace } from '../../../state/types/ChartAreaStateNamespace';
import ChartFactory from '../../../../chart/model/state/ChartFactory';

export default class PasteChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { charts, copiedChart } = currentState;

    if (!copiedChart) {
      return currentState;
    }

    const pastedChart = ChartFactory.createChart(copiedChart.getChartConfiguration());
    pastedChart.id = this.chart.id;
    const newCharts = charts.map((chart) => (chart === this.chart ? pastedChart : chart));

    return {
      ...currentState,
      charts: newCharts,
      selectedChart: pastedChart
    };
  }
}
