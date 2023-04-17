import type { Dimension } from '../../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import ChartAreaStateFactory from '../../../../../state/ChartAreaStateFactory';
import type { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForFilterAddedToSelectedChartAction from '../../fetchdata/StartFetchDataForFilterAddedToSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';

export default class AddDimensionFilterToSelectedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly dimension: Dimension) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForFilterAddedToSelectedChartAction, diContainer, {
      stateNamespace: this.stateNamespace
    });

    const { selectedChart } = currentState;
    selectedChart.filters.addDimensionFilter(this.dimension);
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, selectedChart);
  }
}
