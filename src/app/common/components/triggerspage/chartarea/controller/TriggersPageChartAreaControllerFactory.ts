import { NamespacedControllerFactory } from 'oo-redux-utils';
import type { ChartAreaPageStateNamespace } from '../../../chartarea/model/state/namespace/ChartAreaPageStateNamespace';
import StartFetchDataForOtherChartsAction from '../../../chartarea/model/actions/chart/fetchdata/StartFetchDataForOtherChartsAction';
import diContainer from '../../../../../../di/diContainer';

export default class TriggersPageChartAreaControllerFactory extends NamespacedControllerFactory<ChartAreaPageStateNamespace> {
  // noinspection ES6ModulesDependencies
  createController = () => ({
    startFetchDataForCharts: async (): Promise<void> =>
      this.dispatchActionWithDi(diContainer, StartFetchDataForOtherChartsAction, { chart: null })
  });
}
