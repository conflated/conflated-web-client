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
    const newCharts = _.without(currentState.charts, this.chart);
    const emptyChart = ChartFactory.createChart();
    const selectedChart = newCharts.length > 0 ? newCharts[0] : emptyChart;

    const newState = {
      ...currentState,
      layout: Utils.without(currentState.layout, 'i', this.chart.id),
      charts: newCharts,
      selectedChart
    };

    return newState;
  }
}
