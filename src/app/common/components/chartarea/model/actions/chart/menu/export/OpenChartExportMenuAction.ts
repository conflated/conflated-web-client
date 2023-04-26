import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import type { Chart } from '../../../../../chart/model/state/Chart';
import type { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';
import ChartAreaStateFactory from '../../../../state/ChartAreaStateFactory';

export default class OpenChartExportMenuAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.chart.isExportMenuOpen = true;
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, this.chart);
  }
}
