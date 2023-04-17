import type { AggregationFunction } from '../../../../../../chart/model/state/selectedmeasure/types/AggregationFunction';
import type { Filter } from '../../../../../../chart/model/state/filters/filter/Filter';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import ChartAreaStateFactory from '../../../../../state/ChartAreaStateFactory';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForSelectedChartAction from '../../fetchdata/StartFetchDataForSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';

export default class ChangeFilterAggregationFunctionForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly selectedFilter: Filter,
    private readonly aggregationFunction: AggregationFunction
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    if (this.selectedFilter.dataScope === 'all') {
      this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {
        stateNamespace: this.stateNamespace
      });
    }

    const { selectedChart } = currentState;

    selectedChart.filters.changeFilterAggregationFunction(this.selectedFilter, this.aggregationFunction);

    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, selectedChart);
  }
}
