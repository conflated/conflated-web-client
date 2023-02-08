import type { DispatchAction } from 'oo-redux-utils2';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { ChartAreaPageStateNamespace } from '../../../../../state/namespace/ChartAreaPageStateNamespace';
import Utils from '../../../../../../../../model/state/utils/Utils';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import AbstractChartAreaDispatchingAction from '../../../../AbstractChartAreaDispatchingAction';

export default class ChangeFetchedRowCountForSelectedChartAction extends AbstractChartAreaDispatchingAction {
  constructor(
    stateNamespace: ChartAreaPageStateNamespace,
    dispatchAction: DispatchAction,
    private readonly fetchedRowCountStr: string
  ) {
    super(stateNamespace, dispatchAction);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    selectedChart.fetchedRowCount = Utils.parseIntOrDefault(this.fetchedRowCountStr, 0);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
