import ToggleSelectorOpenAction from './model/actions/ToggleSelectorOpenAction';
import type { SelectorStateNamespace } from './model/state/namespace/SelectorStateNamespace';
import Controller from '../../../../Controller';
import store from '../../../../store/store';
import { AppState } from '../../../../store/AppState';

class SelectorController extends Controller<SelectorStateNamespace> {
  getState(appState: AppState, stateNamespace: SelectorStateNamespace) {
    return appState.common.selectorStates[stateNamespace];
  }

  getActionDispatchers(stateNamespace: SelectorStateNamespace) {
    return {
      toggleSelectorOpen: () => this.dispatch(new ToggleSelectorOpenAction(stateNamespace))
    };
  }
}

export const controller = new SelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
