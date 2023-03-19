import type { SelectedSortBy } from '../../../../../../chart/model/state/selectedsortbys/selectedsortby/SelectedSortBy';
import type { SortDirection } from '../../../../../../chart/model/state/selectedsortbys/selectedsortby/types/SortDirection';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import type { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForSelectedChartAction from '../../fetchdata/StartFetchDataForSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';

export default class ChangeSelectedSortByDirectionForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly selectedSortBy: SelectedSortBy,
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
    selectedChart.selectedSortBys.changeSelectedSortByDirection(this.selectedSortBy, this.sortDirection);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
