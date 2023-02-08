import AbstractPageAction from '../AbstractPageAction';
import type { PageState } from '../../state/PageState';
import type { Pane } from '../../state/types/Pane';
import type { PageStateNamespace } from '../../state/types/PageStateNamespace';

export default class StartPaneGutterDragAction extends AbstractPageAction {
  constructor(
    stateNamespace: PageStateNamespace,
    private readonly pane: Pane,
    private readonly pagePaneGutterPositionOnDragStart: number
  ) {
    super(stateNamespace);
  }

  perform(currentState: PageState): PageState {
    return {
      ...currentState,
      pagePaneGutterPositionOnDragStart: {
        ...currentState.pagePaneGutterPositionOnDragStart,
        [this.pane]:
          currentState.pagePaneGutterPositionOnDragStart[this.pane] === -1
            ? this.pagePaneGutterPositionOnDragStart
            : currentState.pagePaneGutterPositionOnDragStart[this.pane]
      }
    };
  }
}
