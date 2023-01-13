import type { Measure } from '../../../../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/entities/Measure';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { ChartAreaPageStateNamespace } from '../../../../../state/namespace/ChartAreaPageStateNamespace';

export default class AddMeasureFilterToSelectedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly measure: Measure) {
    super(stateNamespace);
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    selectedChart.selectedFilters.addMeasureSelectedFilter(this.measure);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
