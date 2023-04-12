import type { DataScopeType } from '../../../../../../chart/model/state/types/DataScopeType';
import type { Filter } from '../../../../../../chart/model/state/filters/filter/Filter';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import type { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForChangedFilterInSelectedChartAction from '../../fetchdata/StartFetchDataForChangedFilterInSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';

export default class ChangeSelectedFilterDataScopeTypeForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly selectedFilter: Filter,
    private readonly dataScopeType: DataScopeType
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForChangedFilterInSelectedChartAction, diContainer, {
      selectedFilter: this.selectedFilter,
      stateNamespace: this.stateNamespace
    });

    const { selectedChart } = currentState;
    selectedChart.selectedFilters.changeSelectedFilterDataScopeType(this.selectedFilter, this.dataScopeType);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
