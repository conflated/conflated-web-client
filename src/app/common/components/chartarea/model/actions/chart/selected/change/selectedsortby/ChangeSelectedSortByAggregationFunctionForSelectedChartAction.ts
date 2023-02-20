import type { SelectedSortBy } from '../../../../../../chart/model/state/selectedsortbys/selectedsortby/SelectedSortBy';
import type { AggregationFunction } from '../../../../../../chart/model/state/selectedmeasure/types/AggregationFunction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import type { ChartAreaPageStateNamespace } from '../../../../../state/types/ChartAreaPageStateNamespace';
import StartFetchDataForSelectedChartAction from '../../fetchdata/StartFetchDataForSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';

export default class ChangeSelectedSortByAggregationFunctionForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaPageStateNamespace,
    private readonly selectedSortBy: SelectedSortBy,
    private readonly aggregationFunction: AggregationFunction
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    if (this.selectedSortBy.dataScopeType === 'all') {
      this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {
        pageStateNamespace: this.stateNamespace
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
