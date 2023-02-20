import { Controller } from 'oo-redux-utils2';
import StartPaneGutterDragAction from '../model/actions/panesizing/StartPaneGutterDragAction';
import ShowPagePaneAction from '../model/actions/panevisibility/ShowPagePaneAction';
import PagePaneGutterDragAction from '../model/actions/panesizing/PagePaneGutterDragAction';
import { PageStateNamespace } from '../model/state/types/PageStateNamespace';
import { Pane } from '../model/state/types/Pane';
import store from '../../../../../store/store';
import { AppState } from '../../../../../store/AppState';
import { OwnProps } from '../view/PageView';
import FlashBrieflyPaneActivatorHintsAction from '../model/actions/paneactivatorhints/FlashBrieflyPaneActivatorHintsAction';

class PageController extends Controller<PageStateNamespace> {
  getState = (appState: AppState, { pageStateNamespace }: OwnProps) => appState.common.pageStates[pageStateNamespace];

  getActionDispatchers = (pageStateNamespace: PageStateNamespace) => ({
    dragPagePaneGutter: (pane: Pane, pagePaneGutterPosition: number) =>
      this.dispatch(new PagePaneGutterDragAction(pageStateNamespace, pane, pagePaneGutterPosition)),

    flashBrieflyPaneActivatorHints: () => this.dispatch(new FlashBrieflyPaneActivatorHintsAction(pageStateNamespace)),
    showPane: (pane: Pane) => this.dispatch(new ShowPagePaneAction(pageStateNamespace, pane)),

    startPaneGutterDrag: (pane: Pane, pagePaneGutterPositionOnDragStart: number) =>
      this.dispatch(new StartPaneGutterDragAction(pageStateNamespace, pane, pagePaneGutterPositionOnDragStart))
  });
}

export const controller = new PageController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
