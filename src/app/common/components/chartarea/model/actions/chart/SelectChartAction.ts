import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { Chart } from '../../../chart/model/state/Chart';
import { ChartAreaStateNamespace } from '../../state/types/ChartAreaStateNamespace';
import emptyDataSource from '../../../chart/model/state/datasource/emptyDataSource';
import ChartFactory from '../../../chart/model/state/ChartFactory';

export default class SelectChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;

    if (selectedChart === this.chart) {
      return {
        ...currentState,
        selectedChart: ChartFactory.createChart()
      };
    } else {
      if (this.chart.dataSource === emptyDataSource && selectedChart.dataSource !== emptyDataSource) {
        this.chart.dataSource = selectedChart.dataSource;
      }

      return {
        ...currentState,
        selectedChart: this.chart
      };
    }
  }
}
