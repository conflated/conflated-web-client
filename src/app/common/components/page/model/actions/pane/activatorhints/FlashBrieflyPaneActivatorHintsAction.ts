import type { PageState } from '../../../state/PageState';
import AbstractPageAction from '../../AbstractPageAction';
import ShowPagePaneActivatorHintAction from './ShowPagePaneActivatorHintAction';
import HidePagePaneActivatorHintAction from './HidePagePaneActivatorHintAction';

export default class FlashBrieflyPaneActivatorHintsAction extends AbstractPageAction {
  perform(currentState: PageState): PageState {
    this.dispatch(new ShowPagePaneActivatorHintAction(this.stateNamespace));
    setTimeout(() => this.dispatch(new HidePagePaneActivatorHintAction(this.stateNamespace)), 2000);
    setTimeout(() => this.dispatch(new ShowPagePaneActivatorHintAction(this.stateNamespace)), 4000);
    setTimeout(() => this.dispatch(new HidePagePaneActivatorHintAction(this.stateNamespace)), 6000);
    return currentState;
  }
}
