import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { ChartAreaStateNamespace } from '../../../state/types/ChartAreaStateNamespace';
import type { Chart } from '../../../../chart/model/state/Chart';
import ChartAreaStateUpdater from '../../../state/utils/ChartAreaStateUpdater';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import StartFetchDataForSelectedChartAction from '../selected/fetchdata/StartFetchDataForSelectedChartAction';
import diContainer from '../../../../../../../../di/diContainer';

export default class DrillUpChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {
      chart: this.chart,
      stateNamespace: this.stateNamespace
    });

    this.chart.drillUp();
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, this.chart);
  }
}
