import AbstractPageAction from '../AbstractPageAction';
import type { PageState } from '../../state/PageState';

export default class ShowPagePaneActivatorHintAction extends AbstractPageAction {
  perform(currentState: PageState): PageState {
    return {
      ...currentState,
      shouldShowPagePaneActivatorHint: {
        leftPane: true,
        rightPane: true
      }
    };
  }
}
