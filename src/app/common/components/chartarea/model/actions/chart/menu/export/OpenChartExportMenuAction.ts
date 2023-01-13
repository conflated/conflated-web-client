import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import type { Chart } from '../../../../../chart/model/state/Chart';
import type { ChartAreaPageStateNamespace } from '../../../../state/namespace/ChartAreaPageStateNamespace';
import UpdateChartExportMenuCloseTimeoutIdAction from './UpdateChartExportMenuCloseTimeoutIdAction';
import ChartAreaStateUpdater from '../../../../state/utils/ChartAreaStateUpdater';

export default class OpenChartExportMenuAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
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
