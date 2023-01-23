import HidePagePaneAction from '../../../common/components/page/model/actions/panevisibility/HidePagePaneAction';
import Controller from '../../../../Controller';
import { PageStateNamespace } from '../../../common/components/page/model/state/namespace/PageStateNamespace';
import store from '../../../../store/store';

class DataExplorerPageLeftPaneController extends Controller<PageStateNamespace> {
  getActionDispatchers() {
    return {
      hideDataExplorerPageLeftPane: () => this.dispatch(new HidePagePaneAction('dataExplorerPage', 'leftPane'))
    };
  }
}

export const controller = new DataExplorerPageLeftPaneController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
