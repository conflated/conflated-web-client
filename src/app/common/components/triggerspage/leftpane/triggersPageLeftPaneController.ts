import HidePagePaneAction from '../../page/model/actions/panevisibility/HidePagePaneAction';
import type { TriggersPageStateNamespace } from '../model/state/namespace/TriggersPageStateNamespace';
import Controller from '../../../../../Controller';
import { PageStateNamespace } from '../../page/model/state/namespace/PageStateNamespace';
import store from '../../../../../store/store';

class TriggersPageLeftPaneController extends Controller<PageStateNamespace> {
  getActionDispatchers(stateNamespace: TriggersPageStateNamespace) {
    return {
      hideTriggersPageLeftPane: () => this.dispatch(new HidePagePaneAction(stateNamespace, 'leftPane'))
    };
  }
}

export const controller = new TriggersPageLeftPaneController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
