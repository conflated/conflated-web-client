import AbstractSelectorWithActionsAction from './AbstractSelectorWithActionsAction';
import type { SelectorWithActionsState } from '../state/SelectorWithActionsState';
import Utils from '../../../../utils/Utils';
import { SelectorOpenStatus } from '../state/types/SelectorOpenStatus';
import ToggleSelectorOpenAction from '../../../selector/model/actions/ToggleSelectorOpenAction';
import OpenSelectorAction from '../../../selector/model/actions/OpenSelectorAction';
import { SelectorWithActionsStateNamespace } from '../state/types/SelectorWithActionsStateNamespace';

export default class ToggleMaximizeSelectorAction extends AbstractSelectorWithActionsAction {
  constructor(
    stateNamespace: SelectorWithActionsStateNamespace,
    private readonly otherSelectorOpenStatuses: SelectorOpenStatus[]
  ) {
    super(stateNamespace);
  }

  perform(currentState: SelectorWithActionsState): SelectorWithActionsState {
    const closedOtherSelectorsCount = Utils.pick(this.otherSelectorOpenStatuses, 'isOpen', false).length;
    const areAllOtherSelectorsClosed = closedOtherSelectorsCount === this.otherSelectorOpenStatuses.length;

    if (areAllOtherSelectorsClosed) {
      this.otherSelectorOpenStatuses.forEach(({ selectorStateNamespace }: SelectorOpenStatus) =>
        this.dispatch(new ToggleSelectorOpenAction(selectorStateNamespace))
      );
    } else {
      Utils.pick(this.otherSelectorOpenStatuses, 'isOpen', true).forEach(
        ({ selectorStateNamespace }: SelectorOpenStatus) =>
          this.dispatch(new ToggleSelectorOpenAction(selectorStateNamespace))
      );
    }

    this.dispatch(new OpenSelectorAction(this.stateNamespace));

    return {
      ...currentState,
      isSelectorMaximized: !currentState.isSelectorMaximized
    };
  }
}
