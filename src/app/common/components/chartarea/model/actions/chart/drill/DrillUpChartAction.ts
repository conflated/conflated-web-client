import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { ChartAreaPageStateNamespace } from '../../../state/types/ChartAreaPageStateNamespace';
import type { Chart } from '../../../../chart/model/state/Chart';
import ChartAreaStateUpdater from '../../../state/utils/ChartAreaStateUpdater';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import StartFetchDataForSelectedChartAction from '../selected/fetchdata/StartFetchDataForSelectedChartAction';
import diContainer from '../../../../../../../../di/diContainer';

export default class DrillUpChartAction extends AbstractChartAreaAction {
  constructor(pageStateNamespace: ChartAreaPageStateNamespace, private readonly chart: Chart) {
    super(pageStateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {
      chart: this.chart,
      pageStateNamespace: this.stateNamespace
    });

    this.chart.drillUp();
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, this.chart);
  }
}
