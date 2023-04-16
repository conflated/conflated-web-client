import type { Sort } from '../../../../../chart/model/state/sorts/sort/Sort';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import ChartAreaStateUpdater from '../../../../state/utils/ChartAreaStateUpdater';
import type { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForSelectedChartAction from '../fetchdata/StartFetchDataForSelectedChartAction';
import diContainer from '../../../../../../../../../di/diContainer';

export default class RemoveSortFromSelectedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly selectedSortBy: Sort) {
    super(stateNamespace);
    this.selectedSortBy = selectedSortBy;
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    if (this.selectedSortBy.dataScopeType === 'all') {
      this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {
        stateNamespace: this.stateNamespace
      });
    }

    const { selectedChart } = currentState;
    selectedChart.sorts.removeSelectedSortBy(this.selectedSortBy);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
