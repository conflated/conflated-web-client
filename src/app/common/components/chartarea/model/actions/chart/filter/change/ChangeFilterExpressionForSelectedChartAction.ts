import type { Filter } from '../../../../../chart/model/state/filters/filter/Filter';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import ChartAreaStateFactory from '../../../../state/ChartAreaStateFactory';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import type { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForSelectedChartAction from '../../fetchdata/StartFetchDataForSelectedChartAction';
import diContainer from '../../../../../../../../../di/diContainer';

export default class ChangeFilterExpressionForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly filter: Filter,
    private readonly filterExpression: string
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    if (this.filter.dataScope === 'all') {
      this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {
        stateNamespace: this.stateNamespace
      });
    }

    const { selectedChart } = currentState;
    selectedChart.filters.changeFilterExpression(this.filter, this.filterExpression);
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, currentState.selectedChart);
  }
}
