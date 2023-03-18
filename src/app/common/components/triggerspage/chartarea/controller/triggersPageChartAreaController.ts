import { Controller } from 'oo-redux-utils2';
import type { ChartAreaPageStateNamespace } from '../../../chartarea/model/state/types/ChartAreaPageStateNamespace';
import StartFetchDataForOtherChartsAction from '../../../chartarea/model/actions/chart/fetchdata/StartFetchDataForOtherChartsAction';
import diContainer from '../../../../../../di/diContainer';
import store from '../../../../../../store/store';
import { AppState } from '../../../../../../store/AppState';
import { OwnProps } from '../view/TriggersPageChartAreaView';
import OpenTriggerDetailsDialogAction from '../../model/actions/OpenTriggerDetailsDialogAction';
import { TriggersPageStateNamespace } from '../../model/state/TriggersPageStateNamespace';

class TriggersPageChartAreaController extends Controller<ChartAreaPageStateNamespace> {
  getState = (appState: AppState, { pageStateNamespace }: OwnProps) => appState[pageStateNamespace].chartAreaState;

  getActionDispatchers = (pageStateNamespace: TriggersPageStateNamespace) => ({
    openTriggerDetailsDialog: () => this.dispatch(new OpenTriggerDetailsDialogAction(pageStateNamespace)),
    startFetchDataForCharts: () =>
      this.dispatchWithDi(StartFetchDataForOtherChartsAction, diContainer, {
        chart: null,
        pageStateNamespace
      })
  });
}

export const controller = new TriggersPageChartAreaController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
