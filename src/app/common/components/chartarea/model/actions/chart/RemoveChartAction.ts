import _ from 'lodash';
import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { Chart } from '../../../chart/model/state/Chart';
import type { ChartAreaStateNamespace } from '../../state/types/ChartAreaStateNamespace';
import Utils from '../../../../../utils/Utils';
import ChartFactory from '../../../chart/model/state/ChartFactory';

export default class RemoveChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { charts, layout } = currentState;

    const newCharts = _.without(charts, this.chart).map((chart, index) => {
      const chartConfig = chart.getChartConfiguration();
      chartConfig.id = (index + 1).toString();
      return ChartFactory.createChart(chartConfig);
    });

    const emptyChart = ChartFactory.createChart();
    const selectedChart = newCharts.length > 0 ? newCharts[0] : emptyChart;

    const newState = {
      ...currentState,
      layout: Utils.without(layout, 'i', this.chart.id).map((gridItem, index) => ({
        ...gridItem,
        i: (index + 1).toString()
      })),
      charts: newCharts,
      selectedChart
    };

    return newState;
  }
}
