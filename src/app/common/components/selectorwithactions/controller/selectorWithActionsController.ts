import { Controller } from 'oo-redux-utils2';
import ToggleShowSearchInputAction from '../model/actions/search/ToggleShowSearchInputAction';
import ChangeSelectorSearchedValueAction from '../model/actions/search/ChangeSelectorSearchedValueAction';
import type { SelectorWithDefaultActionsStateNamespace } from '../model/state/types/SelectorWithDefaultActionsStateNamespace';
import Utils from '../../../model/state/utils/Utils';
import type { SelectorOpenStatus } from '../model/state/types/SelectorOpenStatus';
import ToggleSelectorOpenAction from '../../selector/model/actions/ToggleSelectorOpenAction';
import ToggleMaximizeSelectorAction from '../model/actions/ToggleMaximizeSelectorAction';
import OpenSelectorAction from '../../selector/model/actions/OpenSelectorAction';
import store from '../../../../../store/store';
import { AppState } from '../../../../../store/AppState';
import { OwnProps } from '../view/SelectorWithActionsView';

class SelectorWithActionsController extends Controller<SelectorWithDefaultActionsStateNamespace> {
  getState(appState: AppState, { selectorStateNamespace }: OwnProps) {
    return appState.common.selectorWithDefaultActionsStates[selectorStateNamespace];
  }

  getActionDispatchers = (_: unknown, { selectorStateNamespace }: OwnProps) => ({
    toggleShowSearchInput: () => this.dispatch(new ToggleShowSearchInputAction(selectorStateNamespace)),

    changeSelectorSearchedValue: (searchedValue: string) =>
      this.dispatch(new ChangeSelectorSearchedValueAction(selectorStateNamespace, searchedValue)),

    toggleMaximizeSelector: (otherSelectorOpenStatuses: SelectorOpenStatus[]) => {
      const closedOtherSelectorsCount = Utils.pick(otherSelectorOpenStatuses, 'isOpen', false).length;
      const areAllOtherSelectorsClosed = closedOtherSelectorsCount === otherSelectorOpenStatuses.length;

      if (areAllOtherSelectorsClosed) {
        otherSelectorOpenStatuses.forEach(
          ({ selectorStateNamespace: otherSelectorStateNamespace }: SelectorOpenStatus) =>
            this.dispatch(new ToggleSelectorOpenAction(otherSelectorStateNamespace))
        );
      } else {
        Utils.pick(otherSelectorOpenStatuses, 'isOpen', true).forEach(
          ({ selectorStateNamespace: otherSelectorStateNamespace }: SelectorOpenStatus) =>
            this.dispatch(new ToggleSelectorOpenAction(otherSelectorStateNamespace))
        );
      }

      this.dispatch(new OpenSelectorAction(selectorStateNamespace));
      this.dispatch(new ToggleMaximizeSelectorAction(selectorStateNamespace));
    }
  });
}

export const controller = new SelectorWithActionsController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
