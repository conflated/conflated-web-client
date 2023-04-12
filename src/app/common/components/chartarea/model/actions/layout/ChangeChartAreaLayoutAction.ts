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

    if (this.newLayout.length <= charts.length) {
      return {
        ...currentState,
        layout: this.newLayout,
        charts: _.take(charts, this.newLayout.length)
      };
    } else {
      const newCharts: Chart[] = [];

      for (let chartId = charts.length + 1; chartId <= this.newLayout.length; chartId++) {
        const emptyChart = ChartFactory.createChart();
        emptyChart.id = chartId.toString();
        newCharts.push(emptyChart);
      }

      return {
        ...currentState,
        layout: this.newLayout,
        charts: [...charts, ...newCharts]
      };
    }
  }
}
