import ChartAreaStateUpdater from '../../../../state/utils/ChartAreaStateUpdater';
import type { SelectedFilter } from '../../../../../chart/model/state/selectedfilters/selectedfilter/SelectedFilter';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import type { ChartAreaPageStateNamespace } from '../../../../state/namespace/ChartAreaPageStateNamespace';

export default class RemoveSelectedFilterFromSelectedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly selectedFilter: SelectedFilter) {
    super(stateNamespace);
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    selectedChart.selectedFilters.removeSelectedFilter(this.selectedFilter);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, currentState.selectedChart);
  }
}
