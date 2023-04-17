import type { Sort } from '../../../../../../chart/model/state/sorts/sort/Sort';
import type { SortDirection } from '../../../../../../chart/model/state/sorts/sort/types/SortDirection';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import ChartAreaStateFactory from '../../../../../state/utils/ChartAreaStateFactory';
import type { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForSelectedChartAction from '../../fetchdata/StartFetchDataForSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';

export default class ChangeSortDirectionForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly selectedSortBy: Sort,
    private readonly sortDirection: SortDirection
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    if (this.selectedSortBy.dataScopeType === 'all') {
      this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {
        stateNamespace: this.stateNamespace
      });
    }

    const { selectedChart } = currentState;
    selectedChart.sorts.changeSelectedSortByDirection(this.selectedSortBy, this.sortDirection);
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, selectedChart);
  }
}
