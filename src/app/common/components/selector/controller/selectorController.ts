import { Controller } from 'oo-redux-utils2';
import ToggleSelectorOpenAction from '../model/actions/ToggleSelectorOpenAction';
import type { SelectorStateNamespace } from '../model/state/types/SelectorStateNamespace';
import store from '../../../../../store/store';
import { AppState } from '../../../../../store/AppState';
import { OwnProps } from '../view/SelectorView';

class SelectorController extends Controller<SelectorStateNamespace> {
  getState = (appState: AppState, { selectorStateNamespace }: OwnProps) =>
    appState.common.selectorStates[selectorStateNamespace];

  getActionDispatchers = (selectorStateNamespace: SelectorStateNamespace) => ({
    toggleSelectorOpen: () => this.dispatch(new ToggleSelectorOpenAction(selectorStateNamespace))
  });
}

export const controller = new SelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
