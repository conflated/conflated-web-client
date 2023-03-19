import type { AggregationFunction } from '../../../../../../chart/model/state/selectedmeasure/types/AggregationFunction';
import type { SelectedFilter } from '../../../../../../chart/model/state/selectedfilters/selectedfilter/SelectedFilter';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForSelectedChartAction from '../../fetchdata/StartFetchDataForSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';

export default class ChangeSelectedFilterAggregationFunctionForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly selectedFilter: SelectedFilter,
    private readonly aggregationFunction: AggregationFunction
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    if (this.selectedFilter.dataScopeType === 'all') {
      this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {
        stateNamespace: this.stateNamespace
      });
    }

    const { selectedChart } = currentState;

    selectedChart.selectedFilters.changeSelectedFilterAggregationFunction(
      this.selectedFilter,
      this.aggregationFunction
    );

    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
