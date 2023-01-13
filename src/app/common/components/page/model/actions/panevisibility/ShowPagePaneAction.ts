import type { PageState } from '../../state/PageState';
import AbstractPageAction from '../AbstractPageAction';
import type { Pane } from '../../state/types/Pane';
import type { PageStateNamespace } from '../../state/namespace/PageStateNamespace';

export default class ShowPagePaneAction extends AbstractPageAction {
  constructor(stateNamespace: PageStateNamespace, private readonly pane: Pane) {
    super(stateNamespace);
  }

  performActionAndReturnNewState(currentState: PageState): PageState {
    return {
      ...currentState,
      shouldShowPagePane: {
        ...currentState.shouldShowPagePane,
        [this.pane]: true
      }
    };
  }
}
