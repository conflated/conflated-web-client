import { Controller } from 'oo-redux-utils2';
import type { ChartAreaStateNamespace } from '../../../../chartarea/model/state/types/ChartAreaStateNamespace';
import diContainer from '../../../../../../../di/diContainer';
import store from '../../../../../../../store/store';
import { AppState } from '../../../../../../../store/AppState';
import { OwnProps } from '../view/TriggersPageChartAreaView';
import OpenTriggerDetailsDialogAction from '../../model/actions/OpenTriggerDetailsDialogAction';
import { TriggersPageStateNamespace } from '../../model/state/TriggersPageStateNamespace';
import StartFetchDataForTriggerChartsAction from '../model/actions/StartFetchDataForTriggerChartsAction';

class TriggersPageChartAreaController extends Controller<ChartAreaStateNamespace> {
  getState = (appState: AppState, { stateNamespace }: OwnProps) => appState[stateNamespace].chartAreaState;

  getActionDispatchers = (stateNamespace: TriggersPageStateNamespace) => ({
    openTriggerDetailsDialog: () => this.dispatch(new OpenTriggerDetailsDialogAction(stateNamespace)),

    startFetchDataForCharts: () =>
      this.dispatchWithDi(StartFetchDataForTriggerChartsAction, diContainer, {
        stateNamespace
      })
  });
}

export const controller = new TriggersPageChartAreaController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
