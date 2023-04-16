import type { Measure } from '../../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForFilterAddedToSelectedChartAction from '../../fetchdata/StartFetchDataForFilterAddedToSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';

export default class AddMeasureFilterToSelectedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly measure: Measure) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForFilterAddedToSelectedChartAction, diContainer, {
      stateNamespace: this.stateNamespace
    });

    const { selectedChart } = currentState;
    selectedChart.filters.addMeasureFilter(this.measure);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
