import _ from 'lodash';
import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { Chart } from '../../../chart/model/state/Chart';
import type { Layout } from '../../state/types/Layout';
import type { ChartAreaStateNamespace } from '../../state/types/ChartAreaStateNamespace';
import ChartFactory from '../../../chart/model/state/ChartFactory';

export default class ChangeChartAreaLayoutAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly newLayout: Layout) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { charts } = currentState;
    const { newLayout } = this;

    const newState = {
      ...currentState,
      layout: newLayout
    };

    if (newLayout.length <= charts.length) {
      return {
        ...newState,
        charts: _.take(charts, newLayout.length)
      };
    }

    const newCharts: Chart[] = [];

    for (let chartId = charts.length; chartId < newLayout.length; chartId++) {
      const emptyChart = ChartFactory.createChart();
      emptyChart.id = (chartId + 1).toString();
      newCharts.push(emptyChart);
    }

    return {
      ...newState,
      charts: [...charts, ...newCharts]
    };
  }
}
