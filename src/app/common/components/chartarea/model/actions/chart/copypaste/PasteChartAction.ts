import _ from 'lodash';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { Chart } from '../../../../chart/model/state/Chart';
import type { ChartAreaPageStateNamespace } from '../../../state/namespace/ChartAreaPageStateNamespace';

export default class PasteChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { charts, copiedChart } = currentState;

    if (!copiedChart) {
      return currentState;
    }

    copiedChart.id = this.chart.id;

    const newState = {
      ...currentState,
      charts: [..._.without(charts, this.chart), copiedChart]
    };

    return newState;
  }
}
