import type { DispatchAction } from 'oo-redux-utils';
import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { ChartAreaPageStateNamespace } from '../../../state/namespace/ChartAreaPageStateNamespace';
import type { Chart } from '../../../../chart/model/state/Chart';
import ChartAreaStateUpdater from '../../../state/utils/ChartAreaStateUpdater';
import AbstractChartAreaDispatchingAction from '../../AbstractChartAreaDispatchingAction';

export default class DrillUpChartAction extends AbstractChartAreaDispatchingAction {
  constructor(
    stateNamespace: ChartAreaPageStateNamespace,
    dispatchAction: DispatchAction,
    private readonly chart: Chart
  ) {
    super(stateNamespace, dispatchAction);
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
    this.chart.drillUp();
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, this.chart);
  }
}
