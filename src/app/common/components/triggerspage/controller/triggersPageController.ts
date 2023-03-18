import { Controller } from 'oo-redux-utils2';
import { TriggersPageStateNamespace } from '../model/state/TriggersPageStateNamespace';
import { AppState } from '../../../../../store/AppState';
import { OwnProps } from '../view/TriggersPageView';
import OpenTriggerDetailsDialogAction from '../model/actions/OpenTriggerDetailsDialogAction';
import store from '../../../../../store/store';
import CloseTriggerDetailsDialogAction from '../model/actions/CloseTriggerDetailsDialogAction';

class TriggersPageController extends Controller<TriggersPageStateNamespace> {
  getState = (appState: AppState, { pageStateNamespace }: OwnProps) => appState[pageStateNamespace].triggersPageState;

  getActionDispatchers = (pageStateNamespace: TriggersPageStateNamespace) => ({
    closeTriggerDetailsDialog: () => this.dispatch(new CloseTriggerDetailsDialogAction(pageStateNamespace)),
    openTriggerDetailsDialog: () => this.dispatch(new OpenTriggerDetailsDialogAction(pageStateNamespace))
  });
}

export const controller = new TriggersPageController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
