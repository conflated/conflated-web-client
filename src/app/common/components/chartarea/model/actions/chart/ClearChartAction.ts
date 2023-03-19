import _ from 'lodash';
import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { Chart } from '../../../chart/model/state/Chart';
import type { ChartAreaStateNamespace } from '../../state/types/ChartAreaStateNamespace';
import ChartFactory from '../../../chart/model/state/ChartFactory';

export default class ClearChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const newChart = ChartFactory.createChart();
    newChart.id = this.chart.id;

    const newState = {
      ...currentState,
      charts: [..._.without(currentState.charts, this.chart), newChart]
    };

    return newState;
  }
}
