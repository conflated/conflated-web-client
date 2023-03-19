import type { SelectedSortBy } from '../../../../../../chart/model/state/selectedsortbys/selectedsortby/SelectedSortBy';
import type { AggregationFunction } from '../../../../../../chart/model/state/selectedmeasure/types/AggregationFunction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import StartFetchDataForSelectedChartAction from '../../fetchdata/StartFetchDataForSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';
import { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';

export default class ChangeSelectedSortByAggregationFunctionForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly selectedSortBy: SelectedSortBy,
    private readonly aggregationFunction: AggregationFunction
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

    selectedChart.selectedSortBys.changeSelectedSortByAggregationFunction(
      this.selectedSortBy,
      this.aggregationFunction
    );

    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, currentState.selectedChart);
  }
}
