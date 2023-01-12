import type { SelectedSortBy } from '../../../../../chart/model/state/selectedsortbys/selectedsortby/SelectedSortBy';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import ChartAreaStateUpdater from '../../../../state/utils/ChartAreaStateUpdater';
import type { ChartAreaPageStateNamespace } from '../../../../state/namespace/ChartAreaPageStateNamespace';

export default class RemoveSelectedSortByFromSelectedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly selectedSortBy: SelectedSortBy) {
    super(stateNamespace);
    this.selectedSortBy = selectedSortBy;
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    selectedChart.selectedSortBys.removeSelectedSortBy(this.selectedSortBy);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
