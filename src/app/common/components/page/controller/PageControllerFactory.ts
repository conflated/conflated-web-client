import { NamespacedControllerFactory } from 'oo-redux-utils';
import StartPaneGutterDragAction from '../model/actions/panesizing/StartPaneGutterDragAction';
import ShowPagePaneAction from '../model/actions/panevisibility/ShowPagePaneAction';
import PagePaneGutterDragAction from '../model/actions/panesizing/PagePaneGutterDragAction';
import { PageStateNamespace } from '../model/state/namespace/PageStateNamespace';
import { Pane } from '../model/state/types/Pane';
import HidePagePaneActivatorHintAction from '../model/actions/paneactivatorhints/HidePagePaneActivatorHintAction';
import ShowPagePaneActivatorHintAction from '../model/actions/paneactivatorhints/ShowPagePaneActivatorHintAction';

export default class PageControllerFactory extends NamespacedControllerFactory<PageStateNamespace> {
  createController = () => ({
    dragPagePaneGutter: (pane: Pane, pagePaneGutterPosition: number) =>
      this.dispatchAction(new PagePaneGutterDragAction(this.stateNamespace, pane, pagePaneGutterPosition)),

    flashBrieflyPaneActivatorHints: () => {
      this.dispatchAction(new ShowPagePaneActivatorHintAction(this.stateNamespace));
      setTimeout(() => this.dispatchAction(new HidePagePaneActivatorHintAction(this.stateNamespace)), 1000);
      setTimeout(() => this.dispatchAction(new ShowPagePaneActivatorHintAction(this.stateNamespace)), 2000);
      setTimeout(() => this.dispatchAction(new HidePagePaneActivatorHintAction(this.stateNamespace)), 3000);
    },

    showPane: (pane: Pane) => this.dispatchAction(new ShowPagePaneAction(this.stateNamespace, pane)),

    startPaneGutterDrag: (pane: Pane, pagePaneGutterPositionOnDragStart: number) =>
      this.dispatchAction(new StartPaneGutterDragAction(this.stateNamespace, pane, pagePaneGutterPositionOnDragStart))
  });
}
