import _ from 'lodash';
import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { Chart } from '../../../chart/model/state/Chart';
import type { ChartAreaPageStateNamespace } from '../../state/types/ChartAreaPageStateNamespace';
import Utils from '../../../../../model/state/utils/Utils';
import ChartFactory from '../../../chart/model/state/factory/ChartFactory';

export default class RemoveChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly chart: Chart) {
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
