import ChartAreaStateUpdater from '../../../../state/utils/ChartAreaStateUpdater';
import type { SelectedFilter } from '../../../../../chart/model/state/selectedfilters/selectedfilter/SelectedFilter';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import type { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForSelectedChartAction from '../fetchdata/StartFetchDataForSelectedChartAction';
import diContainer from '../../../../../../../../../di/diContainer';

export default class RemoveSelectedFilterFromSelectedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly selectedFilter: SelectedFilter) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    if (this.selectedFilter.dataScopeType === 'all') {
      this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {
        stateNamespace: this.stateNamespace
      });
    }

    const { selectedChart } = currentState;
    selectedChart.selectedFilters.removeSelectedFilter(this.selectedFilter);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, currentState.selectedChart);
  }
}
