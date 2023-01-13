import { NamespacedControllerFactory } from 'oo-redux-utils';
import type { Chart } from '../../model/state/Chart';
import type { ChartAreaPageStateNamespace } from '../../../model/state/namespace/ChartAreaPageStateNamespace';
import DrillUpChartAction from '../../../model/actions/chart/drill/DrillUpChartAction';
import diContainer from '../../../../../../../di/diContainer';
import StartFetchDataForSelectedChartAction from '../../../model/actions/chart/selected/fetchdata/StartFetchDataForSelectedChartAction';

export default class DrillUpIconControllerFactory extends NamespacedControllerFactory<ChartAreaPageStateNamespace> {
  drillUpChart(chart: Chart) {
    this.dispatchAction(new DrillUpChartAction(this.stateNamespace, this.dispatchAction, chart));
    this.dispatchActionWithDi(diContainer, StartFetchDataForSelectedChartAction, { chart });
  }

  createController() {
    return {
      drillUpChart: this.drillUpChart
    };
  }
}
