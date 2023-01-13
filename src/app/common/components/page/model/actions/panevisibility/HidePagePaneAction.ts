import AbstractPageAction from '../AbstractPageAction';
import type { Pane } from '../../state/types/Pane';
import type { PageState } from '../../state/PageState';
import type { PageStateNamespace } from '../../state/namespace/PageStateNamespace';

export default class HidePagePaneAction extends AbstractPageAction {
  constructor(stateNamespace: PageStateNamespace, private readonly pane: Pane) {
    super(stateNamespace);
  }

  performActionAndReturnNewState(currentState: PageState): PageState {
    const newState = {
      ...currentState,
      shouldShowPagePane: {
        ...currentState.shouldShowPagePane,
        [this.pane]: false
      }
    };

    return newState;
  }
}
