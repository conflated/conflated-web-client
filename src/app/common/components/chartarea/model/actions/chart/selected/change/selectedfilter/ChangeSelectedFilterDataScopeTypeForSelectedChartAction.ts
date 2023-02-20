import type { DataScopeType } from '../../../../../../chart/model/state/types/DataScopeType';
import type { SelectedFilter } from '../../../../../../chart/model/state/selectedfilters/selectedfilter/SelectedFilter';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import type { ChartAreaPageStateNamespace } from '../../../../../state/types/ChartAreaPageStateNamespace';
import StartFetchDataForChangedFilterInSelectedChartAction from '../../fetchdata/StartFetchDataForChangedFilterInSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';

export default class ChangeSelectedFilterDataScopeTypeForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaPageStateNamespace,
    private readonly selectedFilter: SelectedFilter,
    private readonly dataScopeType: DataScopeType
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForChangedFilterInSelectedChartAction, diContainer, {
      selectedFilter: this.selectedFilter,
      pageStateNamespace: this.stateNamespace
    });

    const { selectedChart } = currentState;
    selectedChart.selectedFilters.changeSelectedFilterDataScopeType(this.selectedFilter, this.dataScopeType);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
