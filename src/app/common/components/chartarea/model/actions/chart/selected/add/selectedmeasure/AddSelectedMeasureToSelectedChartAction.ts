import type { Measure } from '../../../../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/types/Measure';
import type { Dimension } from '../../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/types/Dimension';
import type { AggregationFunction } from '../../../../../../chart/model/state/selectedmeasure/types/AggregationFunction';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import StartFetchDataForSelectedChartAction from '../../fetchdata/StartFetchDataForSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';
import { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import StartFetchDimensionsAction from '../../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/actions/StartFetchDimensionsAction';

export default class AddSelectedMeasureToSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly measureOrDimension: Measure | Dimension,
    private readonly aggregationFunction: AggregationFunction
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {
      stateNamespace: 'dataExplorerPage'
    });

    const { selectedChart } = currentState;
    selectedChart.addSelectedMeasure(this.measureOrDimension, this.aggregationFunction);
    this.dispatchWithDi(StartFetchDimensionsAction, diContainer, { selectedChart });
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
