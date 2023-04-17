import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { SelectedDimension } from '../../../../../../chart/model/state/selecteddimension/SelectedDimension';
import type { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import ChartAreaStateFactory from '../../../../../state/ChartAreaStateFactory';

export default class ChangeSelectedDimensionColorForSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly selectedDimension: SelectedDimension,
    private readonly color: string
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    selectedChart.changeSelectedDimensionColor(this.selectedDimension, this.color);
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, selectedChart);
  }
}
