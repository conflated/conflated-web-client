import { Controller } from 'oo-redux-utils2';
import StartPaneGutterDragAction from '../model/actions/pane/sizing/StartPaneGutterDragAction';
import ShowPagePaneAction from '../model/actions/pane/visibility/ShowPagePaneAction';
import PagePaneGutterDragAction from '../model/actions/pane/sizing/PagePaneGutterDragAction';
import { PageStateNamespace } from '../model/state/types/PageStateNamespace';
import { Pane } from '../model/state/types/Pane';
import store from '../../../../../store/store';
import { AppState } from '../../../../../store/AppState';
import { OwnProps } from '../view/PageView';
import FlashBrieflyPaneActivatorHintsAction from '../model/actions/pane/activatorhints/FlashBrieflyPaneActivatorHintsAction';

class PageController extends Controller<PageStateNamespace> {
  getState = (appState: AppState, { stateNamespace }: OwnProps) => appState.common.pageStates[stateNamespace];

  getActionDispatchers = (stateNamespace: PageStateNamespace) => ({
    dragPagePaneGutter: (pane: Pane, pagePaneGutterPosition: number) =>
      this.dispatch(new PagePaneGutterDragAction(stateNamespace, pane, pagePaneGutterPosition)),

    flashBrieflyPaneActivatorHints: () => this.dispatch(new FlashBrieflyPaneActivatorHintsAction(stateNamespace)),
    showPane: (pane: Pane) => this.dispatch(new ShowPagePaneAction(stateNamespace, pane)),

    startPaneGutterDrag: (pane: Pane, pagePaneGutterPositionOnDragStart: number) =>
      this.dispatch(new StartPaneGutterDragAction(stateNamespace, pane, pagePaneGutterPositionOnDragStart))
  });
}

export const controller = new PageController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
