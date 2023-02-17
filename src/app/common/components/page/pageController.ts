import { Controller } from 'oo-redux-utils2';
import StartPaneGutterDragAction from './model/actions/panesizing/StartPaneGutterDragAction';
import ShowPagePaneAction from './model/actions/panevisibility/ShowPagePaneAction';
import PagePaneGutterDragAction from './model/actions/panesizing/PagePaneGutterDragAction';
import { PageStateNamespace } from './model/state/types/PageStateNamespace';
import { Pane } from './model/state/types/Pane';
import HidePagePaneActivatorHintAction from './model/actions/paneactivatorhints/HidePagePaneActivatorHintAction';
import ShowPagePaneActivatorHintAction from './model/actions/paneactivatorhints/ShowPagePaneActivatorHintAction';
import store from '../../../../store/store';
import { AppState } from '../../../../store/AppState';

class PageController extends Controller<PageStateNamespace> {
  getState(appState: AppState, pageStateNamespace: PageStateNamespace) {
    return appState.common.pageStates[pageStateNamespace];
  }

  createActionDispatchers(stateNamespace: PageStateNamespace) {
    return {
      dragPagePaneGutter: (pane: Pane, pagePaneGutterPosition: number) =>
        this.dispatch(new PagePaneGutterDragAction(stateNamespace, pane, pagePaneGutterPosition)),

      flashBrieflyPaneActivatorHints: () => {
        this.dispatch(new ShowPagePaneActivatorHintAction(stateNamespace));
        setTimeout(() => this.dispatch(new HidePagePaneActivatorHintAction(stateNamespace)), 2000);
        setTimeout(() => this.dispatch(new ShowPagePaneActivatorHintAction(stateNamespace)), 4000);
        setTimeout(() => this.dispatch(new HidePagePaneActivatorHintAction(stateNamespace)), 6000);
      },

      showPane: (pane: Pane) => this.dispatch(new ShowPagePaneAction(stateNamespace, pane)),

      startPaneGutterDrag: (pane: Pane, pagePaneGutterPositionOnDragStart: number) =>
        this.dispatch(new StartPaneGutterDragAction(stateNamespace, pane, pagePaneGutterPositionOnDragStart))
    };
  }

  getActionDispatchers(stateNamespace: PageStateNamespace) {
    return this.getCachedActionDispatchers(this.createActionDispatchers(stateNamespace));
  }
}

export const controller = new PageController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
