import type { ChartAreaState } from '../ChartAreaState';
import ChartFactory from '../../../chart/model/state/ChartFactory';
import type { Chart } from '../../../chart/model/state/Chart';

export default class ChartAreaStateFactory {
  static createNewStateForChangedChart(currentState: ChartAreaState, changedChart: Chart): ChartAreaState {
    const { charts, selectedChart } = currentState;
    const newChart = ChartFactory.createChart(changedChart.getChartConfiguration());

    const newState = {
      ...currentState,
      charts: charts.map((chart) => (chart === changedChart ? newChart : chart)),
      selectedChart: changedChart === selectedChart ? newChart : selectedChart
    };

    return newState;
  }
}
