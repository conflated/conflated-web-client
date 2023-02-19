import _ from 'lodash';
import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { Chart } from '../../../chart/model/state/Chart';
import type { ChartAreaPageStateNamespace } from '../../state/types/ChartAreaPageStateNamespace';
import ChartFactory from '../../../chart/model/state/ChartFactory';

export default class ClearChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly chart: Chart) {
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
