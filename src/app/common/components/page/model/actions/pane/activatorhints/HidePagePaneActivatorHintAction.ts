import type { PageState } from '../../../state/PageState';
import AbstractPageAction from '../../AbstractPageAction';

export default class HidePagePaneActivatorHintAction extends AbstractPageAction {
  perform(currentState: PageState): PageState {
    return {
      ...currentState,
      shouldShowPagePaneActivatorHint: {
        leftPane: false,
        rightPane: false
      }
    };
  }
}
