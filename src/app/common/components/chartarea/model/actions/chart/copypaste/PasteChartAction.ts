import _ from 'lodash';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { Chart } from '../../../../chart/model/state/Chart';
import type { ChartAreaStateNamespace } from '../../../state/types/ChartAreaStateNamespace';

export default class PasteChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { charts, copiedChart } = currentState;

    if (!copiedChart) {
      return currentState;
    }

    copiedChart.id = this.chart.id;

    return {
      ...currentState,
      charts: [..._.without(charts, this.chart), copiedChart]
    };
  }
}
