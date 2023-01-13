import type { Measure } from '../../../../../../../../../pages/dataexplorerpage/leftpane/measureselector/model/state/entities/Measure';
import type { Dimension } from '../../../../../../../../../pages/dataexplorerpage/leftpane/dimensionselector/model/state/entities/Dimension';
import type { AggregationFunction } from '../../../../../../chart/model/state/selectedmeasure/types/AggregationFunction';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { ChartAreaPageStateNamespace } from '../../../../../state/namespace/ChartAreaPageStateNamespace';

export default class AddSelectedMeasureToSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaPageStateNamespace,
    private readonly measureOrDimension: Measure | Dimension,
    private readonly aggregationFunction: AggregationFunction
  ) {
    super(stateNamespace);
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    selectedChart.addSelectedMeasure(this.measureOrDimension, this.aggregationFunction);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
