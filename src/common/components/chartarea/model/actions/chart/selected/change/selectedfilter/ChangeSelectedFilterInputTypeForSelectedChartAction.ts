import type { FilterInputType } from '../../../../../../chart/model/state/selectedfilters/selectedfilter/types/FilterInputType';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import type { SelectedFilter } from '../../../../../../chart/model/state/selectedfilters/selectedfilter/SelectedFilter';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { ChartAreaPageStateNamespace } from '../../../../../state/namespace/ChartAreaPageStateNamespace';

export default class ChangeSelectedFilterInputTypeForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaPageStateNamespace,
    private readonly selectedFilter: SelectedFilter,
    private readonly filterInputType: FilterInputType
  ) {
    super(stateNamespace);
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    selectedChart.selectedFilters.changeSelectedFilterInputType(this.selectedFilter, this.filterInputType);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
