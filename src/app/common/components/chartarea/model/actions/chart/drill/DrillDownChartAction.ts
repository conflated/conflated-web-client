import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { Chart } from '../../../../chart/model/state/Chart';
import type { SelectedDimension } from '../../../../chart/model/state/selecteddimension/SelectedDimension';
import type { ChartAreaStateNamespace } from '../../../state/types/ChartAreaStateNamespace';
import type { DrillDown } from '../../../../chart/model/state/types/DrillDown';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import ChartAreaStateFactory from '../../../state/utils/ChartAreaStateFactory';
import StartFetchDataForChartAction from '../fetchdata/StartFetchDataForChartAction';
import diContainer from '../../../../../../../../di/diContainer';

export default class DrillDownChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly chart: Chart,
    private readonly drillDown: DrillDown,
    private readonly newDrillDownSelectedDimension: SelectedDimension
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForChartAction, diContainer, {
      chart: this.chart,
      stateNamespace: this.stateNamespace
    });

    this.chart.drillDown(this.drillDown, this.newDrillDownSelectedDimension);
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, this.chart);
  }
}
