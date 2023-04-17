import type { Sort } from '../../../../../../chart/model/state/sorts/sort/Sort';
import type { DataScope } from '../../../../../../chart/model/state/types/DataScope';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import ChartAreaStateFactory from '../../../../../state/ChartAreaStateFactory';
import type { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForSelectedChartAction from '../../fetchdata/StartFetchDataForSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';

export default class ChangeSortDataScopeTypeForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly selectedSortBy: Sort,
    private readonly dataScopeType: DataScope
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    if (this.selectedSortBy.dataScope === 'all') {
      this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {
        stateNamespace: this.stateNamespace
      });
    }

    const { selectedChart } = currentState;
    selectedChart.sorts.changeSortDataScope(this.selectedSortBy, this.dataScopeType);
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, selectedChart);
  }
}
