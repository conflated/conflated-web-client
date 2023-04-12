import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { Chart } from '../../../chart/model/state/Chart';
import { nullChart } from '../../state/createChartAreaStateReducer';
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
        selectedChart: nullChart
      };
    } else {
      const newChart =
        selectedChart.dataSource === emptyDataSource
          ? ChartFactory.createChart({
              ...this.chart.getChartConfiguration(),
              dataSource: selectedChart.dataSource
            })
          : this.chart;

      return {
        ...currentState,
        selectedChart: newChart
      };
    }
  }
}
