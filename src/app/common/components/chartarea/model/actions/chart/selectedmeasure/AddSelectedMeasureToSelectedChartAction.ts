import type { Measure } from '../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { AggregationFunction } from '../../../../chart/model/state/selectedmeasure/types/AggregationFunction';
import ChartAreaStateFactory from '../../../state/ChartAreaStateFactory';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../state/ChartAreaState';
import StartFetchDataForSelectedChartAction from '../fetchdata/StartFetchDataForSelectedChartAction';
import diContainer from '../../../../../../../../di/diContainer';
import { ChartAreaStateNamespace } from '../../../state/types/ChartAreaStateNamespace';
import StartFetchDimensionsAction from '../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/actions/StartFetchDimensionsAction';
import { MeasureVisualizationType } from '../../../../chart/model/state/selectedmeasure/types/MeasureVisualizationType';

export default class AddSelectedMeasureToSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly measureOrDimension: Measure | Dimension,
    private readonly aggregationFunction: AggregationFunction,
    private readonly visualizationType: MeasureVisualizationType
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {
      stateNamespace: 'dataExplorerPage'
    });

    const { selectedChart } = currentState;
    selectedChart.addSelectedMeasure(this.measureOrDimension, this.aggregationFunction, this.visualizationType);
    this.dispatchWithDi(StartFetchDimensionsAction, diContainer, { selectedChart });
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, selectedChart);
  }
}
