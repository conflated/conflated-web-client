import type { FilterInputType } from '../../../../../chart/model/state/filters/filter/inputtype/FilterInputType';
import ChartAreaStateFactory from '../../../../state/ChartAreaStateFactory';
import type { Filter } from '../../../../../chart/model/state/filters/filter/Filter';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import StartFetchDataForChangedFilterInSelectedChartAction from '../fetchdata/StartFetchDataForChangedFilterInSelectedChartAction';
import diContainer from '../../../../../../../../../di/diContainer';
import { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';

export default class ChangeFilterInputTypeForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly filter: Filter,
    private readonly filterInputType: FilterInputType
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForChangedFilterInSelectedChartAction, diContainer, {
      selectedFilter: this.filter,
      stateNamespace: this.stateNamespace
    });

    const { selectedChart } = currentState;
    selectedChart.filters.changeFilterInputType(this.filter, this.filterInputType);
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, selectedChart);
  }
}