import type { Measure } from '../../../../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/types/Measure';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { ChartAreaPageStateNamespace } from '../../../../../state/types/ChartAreaPageStateNamespace';
import StartFetchDataForFilterAddedToSelectedChartAction from '../../fetchdata/StartFetchDataForFilterAddedToSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';

export default class AddMeasureFilterToSelectedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly measure: Measure) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForFilterAddedToSelectedChartAction, diContainer, {
      pageStateNamespace: this.stateNamespace
    });

    const { selectedChart } = currentState;
    selectedChart.selectedFilters.addMeasureSelectedFilter(this.measure);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
