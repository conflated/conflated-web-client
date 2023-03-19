import { Controller } from 'oo-redux-utils2';
import ToggleShowSearchInputAction from '../model/actions/search/ToggleShowSearchInputAction';
import ChangeSelectorSearchedValueAction from '../model/actions/search/ChangeSelectorSearchedValueAction';
import type { SelectorWithActionsStateNamespace } from '../model/state/types/SelectorWithActionsStateNamespace';
import type { SelectorOpenStatus } from '../model/state/types/SelectorOpenStatus';
import ToggleMaximizeSelectorAction from '../model/actions/ToggleMaximizeSelectorAction';
import store from '../../../../../../store/store';
import { AppState } from '../../../../../../store/AppState';
import { OwnProps } from '../view/SelectorWithActionsView';
import ToggleListItemReorderModeAction from '../model/actions/ToggleListItemReorderModeAction';

class SelectorWithActionsController extends Controller<SelectorWithActionsStateNamespace> {
  getState = (appState: AppState, { selectorStateNamespace }: OwnProps) =>
    appState.common.selectorWithDefaultActionsStates[selectorStateNamespace];

  getActionDispatchers = (selectorStateNamespace: SelectorWithActionsStateNamespace) => ({
    toggleShowSearchInput: () => this.dispatch(new ToggleShowSearchInputAction(selectorStateNamespace)),

    changeSelectorSearchedValue: (searchedValue: string) =>
      this.dispatch(new ChangeSelectorSearchedValueAction(selectorStateNamespace, searchedValue)),

    toggleListItemReorderMode: () => this.dispatch(new ToggleListItemReorderModeAction(selectorStateNamespace)),

    toggleMaximizeSelector: (otherSelectorOpenStatuses: SelectorOpenStatus[]) => {
      this.dispatch(new ToggleMaximizeSelectorAction(selectorStateNamespace, otherSelectorOpenStatuses));
    }
  });
}

export const controller = new SelectorWithActionsController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
