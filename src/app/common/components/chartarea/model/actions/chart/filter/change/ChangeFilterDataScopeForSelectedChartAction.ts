import type { DataScope } from '../../../../../chart/model/state/types/DataScope';
import type { Filter } from '../../../../../chart/model/state/filters/filter/Filter';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import ChartAreaStateFactory from '../../../../state/ChartAreaStateFactory';
import type { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForChangedFilterInSelectedChartAction from '../fetchdata/StartFetchDataForChangedFilterInSelectedChartAction';
import diContainer from '../../../../../../../../../di/diContainer';

export default class ChangeFilterDataScopeForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly filter: Filter,
    private readonly dataScope: DataScope
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForChangedFilterInSelectedChartAction, diContainer, {
      selectedFilter: this.filter,
      stateNamespace: this.stateNamespace
    });

    const { selectedChart } = currentState;
    selectedChart.filters.changeFilterDataScope(this.filter, this.dataScope);
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, selectedChart);
  }
}
