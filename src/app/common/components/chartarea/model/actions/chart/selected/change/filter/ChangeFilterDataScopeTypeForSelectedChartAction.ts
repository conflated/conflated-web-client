import type { DataScope } from '../../../../../../chart/model/state/types/DataScope';
import type { Filter } from '../../../../../../chart/model/state/filters/filter/Filter';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import ChartAreaStateFactory from '../../../../../state/ChartAreaStateFactory';
import type { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForChangedFilterInSelectedChartAction from '../../fetchdata/StartFetchDataForChangedFilterInSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';

export default class ChangeFilterDataScopeTypeForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly selectedFilter: Filter,
    private readonly dataScopeType: DataScope
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForChangedFilterInSelectedChartAction, diContainer, {
      selectedFilter: this.selectedFilter,
      stateNamespace: this.stateNamespace
    });

    const { selectedChart } = currentState;
    selectedChart.filters.changeFilterDataScopeType(this.selectedFilter, this.dataScopeType);
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, selectedChart);
  }
}
