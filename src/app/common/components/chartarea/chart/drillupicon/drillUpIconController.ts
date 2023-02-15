import { Controller } from 'oo-redux-utils2';
import type { Chart } from '../model/state/Chart';
import type { ChartAreaPageStateNamespace } from '../../model/state/types/ChartAreaPageStateNamespace';
import DrillUpChartAction from '../../model/actions/chart/drill/DrillUpChartAction';
import diContainer from '../../../../../../di/diContainer';
import StartFetchDataForSelectedChartAction from '../../model/actions/chart/selected/fetchdata/StartFetchDataForSelectedChartAction';
import store from '../../../../../../store/store';

class DrillUpIconController extends Controller<ChartAreaPageStateNamespace> {
  getActionDispatchers(stateNamespace: ChartAreaPageStateNamespace) {
    return {
      drillUpChart: (chart: Chart) => {
        this.dispatch(new DrillUpChartAction(stateNamespace, chart));
        this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, { chart, stateNamespace });
      }
    };
  }
}

export const controller = new DrillUpIconController(store.dispatch);
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
