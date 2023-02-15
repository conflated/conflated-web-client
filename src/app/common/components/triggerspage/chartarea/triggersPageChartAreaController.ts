import { Controller } from 'oo-redux-utils2';
import type { ChartAreaPageStateNamespace } from '../../chartarea/model/state/types/ChartAreaPageStateNamespace';
import StartFetchDataForOtherChartsAction from '../../chartarea/model/actions/chart/fetchdata/StartFetchDataForOtherChartsAction';
import diContainer from '../../../../../di/diContainer';
import store from '../../../../../store/store';
import { AppState } from '../../../../../store/AppState';

class TriggersPageChartAreaController extends Controller<ChartAreaPageStateNamespace> {
  getState(appState: AppState, stateNamespace: ChartAreaPageStateNamespace) {
    return appState[stateNamespace].chartAreaState;
  }

  getActionDispatchers(stateNamespace: ChartAreaPageStateNamespace) {
    return {
      startFetchDataForCharts: () =>
        this.dispatchWithDi(StartFetchDataForOtherChartsAction, diContainer, { chart: null, stateNamespace })
    };
  }
}

export const controller = new TriggersPageChartAreaController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
