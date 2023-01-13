import type { Dimension } from '../../../../../../../../../pages/dataexplorerpage/leftpane/dimensionselector/model/state/entities/Dimension';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import type { ChartAreaPageStateNamespace } from '../../../../../state/namespace/ChartAreaPageStateNamespace';

export default class AddDimensionFilterToSelectedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly dimension: Dimension) {
    super(stateNamespace);
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    selectedChart.selectedFilters.addDimensionSelectedFilter(this.dimension);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
