import type { SelectedSortBy } from '../../../../../../chart/model/state/selectedsortbys/selectedsortby/SelectedSortBy';
import type { DataScopeType } from '../../../../../../../../model/state/types/DataScopeType';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import type { ChartAreaPageStateNamespace } from '../../../../../state/namespace/ChartAreaPageStateNamespace';

export default class ChangeSelectedSortByDataScopeTypeForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaPageStateNamespace,
    private readonly selectedSortBy: SelectedSortBy,
    private readonly dataScopeType: DataScopeType
  ) {
    super(stateNamespace);
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    selectedChart.selectedSortBys.changeSelectedSortByDataScopeType(this.selectedSortBy, this.dataScopeType);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
