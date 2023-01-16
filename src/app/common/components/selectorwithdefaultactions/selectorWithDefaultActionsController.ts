import ToggleShowSearchInputAction from './model/actions/search/ToggleShowSearchInputAction';
import ChangeSelectorSearchedValueAction from './model/actions/search/ChangeSelectorSearchedValueAction';
import type { SelectorWithDefaultActionsStateNamespace } from './model/state/namespace/SelectorWithDefaultActionsStateNamespace';
import Utils from '../../model/state/utils/Utils';
import type { SelectorOpenStatus } from './model/state/entities/SelectorOpenStatus';
import ToggleSelectorOpenAction from '../selector/model/actions/ToggleSelectorOpenAction';
import ToggleMaximizeSelectorAction from './model/actions/ToggleMaximizeSelectorAction';
import OpenSelectorAction from '../selector/model/actions/OpenSelectorAction';
import Controller from '../../../../Controller';
import store from '../../../../store/store';
import { AppState } from '../../../../store/AppState';

class SelectorWithDefaultActionsController extends Controller<SelectorWithDefaultActionsStateNamespace> {
  getState(appState: AppState, stateNamespace: SelectorWithDefaultActionsStateNamespace) {
    return appState.common.selectorWithDefaultActionsStates[stateNamespace];
  }

  getActionDispatchers(selectorStateNamespace: SelectorWithDefaultActionsStateNamespace) {
    return {
      toggleShowSearchInput: () => this.dispatch(new ToggleShowSearchInputAction(selectorStateNamespace)),

      changeSelectorSearchedValue: (searchedValue: string) =>
        this.dispatch(new ChangeSelectorSearchedValueAction(selectorStateNamespace, searchedValue)),

      toggleMaximizeSelector: (otherSelectorOpenStatuses: SelectorOpenStatus[]) => {
        const closedOtherSelectorsCount = Utils.pick(otherSelectorOpenStatuses, 'isOpen', false).length;
        const areAllOtherSelectorsClosed = closedOtherSelectorsCount === otherSelectorOpenStatuses.length;

        if (areAllOtherSelectorsClosed) {
          otherSelectorOpenStatuses.forEach(({ stateNamespace }: SelectorOpenStatus) =>
            this.dispatch(new ToggleSelectorOpenAction(stateNamespace))
          );
        } else {
          Utils.pick(otherSelectorOpenStatuses, 'isOpen', true).forEach(({ stateNamespace }: SelectorOpenStatus) =>
            this.dispatch(new ToggleSelectorOpenAction(stateNamespace))
          );
        }

        this.dispatch(new OpenSelectorAction(selectorStateNamespace));
        this.dispatch(new ToggleMaximizeSelectorAction(selectorStateNamespace));
      }
    };
  }
}

export const controller = new SelectorWithDefaultActionsController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
