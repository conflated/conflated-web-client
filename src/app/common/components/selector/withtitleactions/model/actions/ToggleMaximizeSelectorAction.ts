import AbstractSelectorWithTitleActionsAction from './AbstractSelectorWithTitleActionsAction';
import type { SelectorWithTitleActionsState } from '../state/SelectorWithTitleActionsState';
import Utils from '../../../../../utils/Utils';
import { SelectorOpenStatus } from '../state/types/SelectorOpenStatus';
import ToggleSelectorOpenAction from '../../../model/actions/ToggleSelectorOpenAction';
import OpenSelectorAction from '../../../model/actions/OpenSelectorAction';
import { SelectorWithTitleActionsStateNamespace } from '../state/types/SelectorWithTitleActionsStateNamespace';

export default class ToggleMaximizeSelectorAction extends AbstractSelectorWithTitleActionsAction {
  constructor(
    stateNamespace: SelectorWithTitleActionsStateNamespace,
    private readonly otherSelectorOpenStatuses: SelectorOpenStatus[]
  ) {
    super(stateNamespace);
  }

  perform(currentState: SelectorWithTitleActionsState): SelectorWithTitleActionsState {
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
