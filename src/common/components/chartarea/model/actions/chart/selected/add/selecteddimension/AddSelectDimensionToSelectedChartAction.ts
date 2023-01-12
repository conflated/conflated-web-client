import type { Dimension } from '../../../../../../../../../dataexplorerpage/leftpane/dimensionselector/model/state/entities/Dimension';
import type { DimensionVisualizationType } from '../../../../../../chart/model/state/selecteddimension/types/DimensionVisualizationType';
import type { Measure } from '../../../../../../../../../dataexplorerpage/leftpane/measureselector/model/state/entities/Measure';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { ChartAreaPageStateNamespace } from '../../../../../state/namespace/ChartAreaPageStateNamespace';

export default class AddSelectDimensionToSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaPageStateNamespace,
    private readonly dimension: Dimension | Measure,
    private readonly visualizationType?: DimensionVisualizationType
  ) {
    super(stateNamespace);
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    const visualizationType = this.visualizationType || selectedChart.getNextDimensionVisualizationType();
    selectedChart.addSelectedDimension(this.dimension, visualizationType);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
