import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { Chart } from '../../../../chart/model/state/Chart';
import type { SelectedDimension } from '../../../../chart/model/state/selecteddimension/SelectedDimension';
import type { ChartAreaPageStateNamespace } from '../../../state/namespace/ChartAreaPageStateNamespace';
import type { DrillDown } from '../../../../chart/model/state/types/DrillDown';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import ChartAreaStateUpdater from '../../../state/utils/ChartAreaStateUpdater';

export default class DrillDownChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaPageStateNamespace,
    private readonly chart: Chart,
    private readonly drillDown: DrillDown,
    private readonly newDrillDownSelectedDimension: SelectedDimension
  ) {
    super(stateNamespace);
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
    this.chart.drillDown(this.drillDown, this.newDrillDownSelectedDimension);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, this.chart);
  }
}
