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
import { OwnProps } from './view/PageView';

class PageController extends Controller<PageStateNamespace> {
  getState(appState: AppState, { pageStateNamespace }: OwnProps) {
    return appState.common.pageStates[pageStateNamespace];
  }

  getActionDispatchers = (_: unknown, { pageStateNamespace }: OwnProps) => ({
    dragPagePaneGutter: (pane: Pane, pagePaneGutterPosition: number) =>
      this.dispatch(new PagePaneGutterDragAction(pageStateNamespace, pane, pagePaneGutterPosition)),

    flashBrieflyPaneActivatorHints: () => {
      this.dispatch(new ShowPagePaneActivatorHintAction(pageStateNamespace));
      setTimeout(() => this.dispatch(new HidePagePaneActivatorHintAction(pageStateNamespace)), 2000);
      setTimeout(() => this.dispatch(new ShowPagePaneActivatorHintAction(pageStateNamespace)), 4000);
      setTimeout(() => this.dispatch(new HidePagePaneActivatorHintAction(pageStateNamespace)), 6000);
    },

    showPane: (pane: Pane) => this.dispatch(new ShowPagePaneAction(pageStateNamespace, pane)),

    startPaneGutterDrag: (pane: Pane, pagePaneGutterPositionOnDragStart: number) =>
      this.dispatch(new StartPaneGutterDragAction(pageStateNamespace, pane, pagePaneGutterPositionOnDragStart))
  });
}

export const controller = new PageController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
