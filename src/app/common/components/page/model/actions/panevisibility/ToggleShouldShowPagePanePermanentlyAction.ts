import type { PageState } from '../../state/PageState';
import type { Pane } from '../../state/types/Pane';
import AbstractPageAction from '../AbstractPageAction';
import type { PageStateNamespace } from '../../state/types/PageStateNamespace';

export default class ToggleShouldShowPagePanePermanentlyAction extends AbstractPageAction {
  constructor(stateNamespace: PageStateNamespace, private readonly pane: Pane) {
    super(stateNamespace);
  }

  perform(currentState: PageState): PageState {
    const newState = {
      ...currentState,
      shouldShowPagePanePermanently: {
        ...currentState.shouldShowPagePanePermanently,
        [this.pane]: !currentState.shouldShowPagePanePermanently[this.pane]
      }
    };

    return newState;
  }
}
