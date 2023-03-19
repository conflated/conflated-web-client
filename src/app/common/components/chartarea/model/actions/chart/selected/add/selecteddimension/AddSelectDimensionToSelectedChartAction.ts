import type { Dimension } from '../../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/types/Dimension';
import type { DimensionVisualizationType } from '../../../../../../chart/model/state/selecteddimension/types/DimensionVisualizationType';
import type { Measure } from '../../../../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/types/Measure';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForSelectedChartAction from '../../fetchdata/StartFetchDataForSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';

export default class AddSelectDimensionToSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly dimension: Dimension | Measure,
    private readonly visualizationType?: DimensionVisualizationType
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {
      stateNamespace: 'dataExplorerPage'
    });

    const { selectedChart } = currentState;
    const visualizationType = this.visualizationType || selectedChart.getNextDimensionVisualizationType();
    selectedChart.addSelectedDimension(this.dimension, visualizationType);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
