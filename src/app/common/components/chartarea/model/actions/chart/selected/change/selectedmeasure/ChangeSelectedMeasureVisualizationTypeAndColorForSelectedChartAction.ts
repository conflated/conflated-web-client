import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { SelectedMeasure } from '../../../../../../chart/model/state/selectedmeasure/SelectedMeasure';
import type { MeasureVisualizationType } from '../../../../../../chart/model/state/selectedmeasure/types/MeasureVisualizationType';
import type { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import ChartAreaStateFactory from '../../../../../state/utils/ChartAreaStateFactory';

export default class ChangeSelectedMeasureVisualizationTypeAndColorForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly selectedMeasure: SelectedMeasure,
    private readonly visualizationType: MeasureVisualizationType
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;

    selectedChart.changeSelectedMeasureTypeAndColor(
      this.selectedMeasure,
      this.visualizationType,
      selectedChart.getMeasureVisualizationColorFor(this.selectedMeasure, this.visualizationType)
    );

    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, selectedChart);
  }
}
