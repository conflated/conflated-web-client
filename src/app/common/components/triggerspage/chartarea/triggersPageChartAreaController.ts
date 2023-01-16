import type { ChartAreaPageStateNamespace } from '../../chartarea/model/state/namespace/ChartAreaPageStateNamespace';
import StartFetchDataForOtherChartsAction from '../../chartarea/model/actions/chart/fetchdata/StartFetchDataForOtherChartsAction';
import diContainer from '../../../../../di/diContainer';
import Controller from '../../../../../Controller';
import store from '../../../../../store/store';
import { AppState } from '../../../../../store/AppState';

export default class TriggersPageChartAreaController extends Controller<ChartAreaPageStateNamespace> {
  getState(appState: AppState, stateNamespace: ChartAreaPageStateNamespace) {
    return appState[stateNamespace].chartAreaState;
  }

  getActionDispatchers() {
    return {
      startFetchDataForCharts: () =>
        this.dispatchWithDi(diContainer, StartFetchDataForOtherChartsAction, { chart: null })
    };
  }
}

export const controller = new TriggersPageChartAreaController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
