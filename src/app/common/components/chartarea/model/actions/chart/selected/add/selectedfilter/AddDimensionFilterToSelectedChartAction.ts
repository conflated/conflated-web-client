import type { Dimension } from '../../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/types/Dimension';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import type { ChartAreaPageStateNamespace } from '../../../../../state/types/ChartAreaPageStateNamespace';
import StartFetchDataForFilterAddedToSelectedChartAction from '../../fetchdata/StartFetchDataForFilterAddedToSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';

export default class AddDimensionFilterToSelectedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly dimension: Dimension) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForFilterAddedToSelectedChartAction, diContainer, {
      pageStateNamespace: this.stateNamespace
    });

    const { selectedChart } = currentState;
    selectedChart.selectedFilters.addDimensionSelectedFilter(this.dimension);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
