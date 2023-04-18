import type { SelectedMeasure } from '../../../../../chart/model/state/selectedmeasure/SelectedMeasure';
import type { AggregationFunction } from '../../../../../chart/model/state/selectedmeasure/types/AggregationFunction';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import ChartAreaStateFactory from '../../../../state/ChartAreaStateFactory';
import StartFetchDataForSelectedChartAction from '../../fetchdata/StartFetchDataForSelectedChartAction';
import diContainer from '../../../../../../../../../di/diContainer';
import { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';

export default class ChangeSelectedMeasureAggregationFunctionForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly selectedMeasure: SelectedMeasure,
    private readonly aggregationFunction: AggregationFunction
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {
      stateNamespace: 'dataExplorerPage'
    });

    const { selectedChart } = currentState;
    selectedChart.changeSelectedMeasureAggregationFunction(this.selectedMeasure, this.aggregationFunction);
    const chart = ChartAreaStateFactory.createNewStateForChangedChart(currentState, selectedChart);
    return chart;
  }
}
