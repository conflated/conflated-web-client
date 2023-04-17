import type { Dimension } from '../../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { DimensionVisualizationType } from '../../../../../../chart/model/state/selecteddimension/DimensionVisualizationType';
import type { Measure } from '../../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import ChartAreaStateFactory from '../../../../../state/ChartAreaStateFactory';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForSelectedChartAction from '../../fetchdata/StartFetchDataForSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';
import StartFetchMeasuresAction from '../../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/actions/StartFetchMeasuresAction';
import StartFetchDimensionsAction from '../../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/actions/StartFetchDimensionsAction';

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
    this.dispatchWithDi(StartFetchMeasuresAction, diContainer, { selectedChart });
    this.dispatchWithDi(StartFetchDimensionsAction, diContainer, { selectedChart });
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, selectedChart);
  }
}
