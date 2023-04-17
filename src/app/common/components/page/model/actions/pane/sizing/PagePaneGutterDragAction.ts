import AbstractPageAction from '../../AbstractPageAction';
import type { PageState } from '../../../state/PageState';
import type { Pane } from '../../../state/types/Pane';
import type { PageStateNamespace } from '../../../state/types/PageStateNamespace';

export default class PagePaneGutterDragAction extends AbstractPageAction {
  constructor(
    stateNamespace: PageStateNamespace,
    private readonly pane: Pane,
    private readonly pagePaneGutterPosition: number
  ) {
    super(stateNamespace);
  }

  perform(currentState: PageState): PageState {
    return {
      ...currentState,
      pagePaneGutterOffset: {
        ...currentState.pagePaneGutterOffset,
        [this.pane]: this.pagePaneGutterPosition - currentState.pagePaneGutterPositionOnDragStart[this.pane]
      }
    };
  }
}