import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import type { SelectedMeasure } from '../../../../../chart/model/state/selectedmeasure/SelectedMeasure';
import type { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';
import ChartAreaStateFactory from '../../../../state/ChartAreaStateFactory';

export default class ChangeSelectedMeasureColorForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly selectedMeasure: SelectedMeasure,
    private readonly color: string
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    currentState.selectedChart.changeSelectedMeasureColor(this.selectedMeasure, this.color);
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, currentState.selectedChart);
  }
}
