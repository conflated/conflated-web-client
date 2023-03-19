import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import type { Chart } from '../../../../../chart/model/state/Chart';
import type { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';
import UpdateChartExportMenuCloseTimeoutIdAction from './UpdateChartExportMenuCloseTimeoutIdAction';
import ChartAreaStateUpdater from '../../../../state/utils/ChartAreaStateUpdater';

export default class OpenChartExportMenuAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    let newState = currentState;

    if (this.chart.exportMenuCloseTimeoutID) {
      newState = this.performAction(
        new UpdateChartExportMenuCloseTimeoutIdAction(this.stateNamespace, this.chart, 0),
        currentState
      );
    }

    this.chart.isExportMenuOpen = true;
    return ChartAreaStateUpdater.getNewStateForChangedChart(newState, this.chart);
  }
}
