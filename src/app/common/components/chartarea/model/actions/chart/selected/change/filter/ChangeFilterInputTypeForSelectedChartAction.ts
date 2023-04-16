import type { FilterInputType } from '../../../../../../chart/model/state/filters/filter/inputtype/FilterInputType';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import type { Filter } from '../../../../../../chart/model/state/filters/filter/Filter';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import StartFetchDataForChangedFilterInSelectedChartAction from '../../fetchdata/StartFetchDataForChangedFilterInSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';
import { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';

export default class ChangeFilterInputTypeForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly selectedFilter: Filter,
    private readonly filterInputType: FilterInputType
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForChangedFilterInSelectedChartAction, diContainer, {
      selectedFilter: this.selectedFilter,
      stateNamespace: this.stateNamespace
    });

    const { selectedChart } = currentState;
    selectedChart.filters.changeFilterInputType(this.selectedFilter, this.filterInputType);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
