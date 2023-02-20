import type { SelectedFilter } from '../../../../../../chart/model/state/selectedfilters/selectedfilter/SelectedFilter';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaPageStateNamespace } from '../../../../../state/types/ChartAreaPageStateNamespace';
import StartFetchDataForSelectedChartAction from '../../fetchdata/StartFetchDataForSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';

export default class ChangeSelectedFilterExpressionForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaPageStateNamespace,
    private readonly selectedFilter: SelectedFilter,
    private readonly expression: string
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    if (this.selectedFilter.dataScopeType === 'all') {
      this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {
        pageStateNamespace: this.stateNamespace
      });
    }

    const { selectedChart } = currentState;
    selectedChart.selectedFilters.changeSelectedFilterExpression(this.selectedFilter, this.expression);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, currentState.selectedChart);
  }
}
