// @flow

import { NamespacedControllerFactory } from 'oo-redux-utils';
import ToggleShowSearchInputAction from '../model/actions/search/ToggleShowSearchInputAction';
import ChangeSelectorSearchedValueAction from '../model/actions/search/ChangeSelectorSearchedValueAction';
import type { SelectorWithDefaultActionsStateNamespace } from '../model/state/namespace/SelectorWithDefaultActionsStateNamespace';
import Utils from '../../../model/state/utils/Utils';
import type { SelectorOpenStatus } from '../model/state/entities/SelectorOpenStatus';
import ToggleSelectorOpenAction from '../../selector/model/actions/ToggleSelectorOpenAction';
import ToggleMaximizeSelectorAction from '../model/actions/ToggleMaximizeSelectorAction';
import OpenSelectorAction from '../../selector/model/actions/OpenSelectorAction';

export default class SelectorWithDefaultActionsControllerFactory extends NamespacedControllerFactory<SelectorWithDefaultActionsStateNamespace> {
  createController = () => ({
    toggleShowSearchInput: () => this.dispatchAction(new ToggleShowSearchInputAction(this.stateNamespace)),

    changeSelectorSearchedValue: (searchedValue: string) =>
      this.dispatchAction(new ChangeSelectorSearchedValueAction(this.stateNamespace, searchedValue)),

    toggleMaximizeSelector: (otherSelectorOpenStatuses: SelectorOpenStatus[]) => {
      const closedOtherSelectorsCount = Utils.pick(otherSelectorOpenStatuses, 'isOpen', false).length;
      const areAllOtherSelectorsClosed = closedOtherSelectorsCount === otherSelectorOpenStatuses.length;

      if (areAllOtherSelectorsClosed) {
        otherSelectorOpenStatuses.forEach(({ stateNamespace }: SelectorOpenStatus) =>
          this.dispatchAction(new ToggleSelectorOpenAction(stateNamespace))
        );
      } else {
        Utils.pick(otherSelectorOpenStatuses, 'isOpen', true).forEach(
          ({ stateNamespace }: SelectorOpenStatus) =>
            this.dispatchAction(new ToggleSelectorOpenAction(stateNamespace))
        );
      }

      this.dispatchAction(new OpenSelectorAction(this.stateNamespace));
      this.dispatchAction(new ToggleMaximizeSelectorAction(this.stateNamespace));
    }
  });
}
