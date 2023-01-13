import _ from 'lodash';
import type { ChartAreaState } from '../ChartAreaState';
import ChartFactory from '../../../chart/model/state/factory/ChartFactory';
import type { Chart } from '../../../chart/model/state/Chart';

export default class ChartAreaStateUpdater {
  static getNewStateForChangedChart(currentState: ChartAreaState, chart: Chart): ChartAreaState {
    const { charts, selectedChart } = currentState;

    const newChart = chart === selectedChart ? ChartFactory.createChart(chart.getChartConfiguration()) : chart;

    const newState = {
      ...currentState,
      charts: [..._.without(charts, chart), newChart],
      selectedChart: chart === selectedChart ? newChart : selectedChart
    };

    return newState;
  }
}
