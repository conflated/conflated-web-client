import { Controller } from 'oo-redux-utils2';
import HidePagePaneAction from '../../../page/model/actions/panevisibility/HidePagePaneAction';
import type { TriggersPageStateNamespace } from '../../model/state/TriggersPageStateNamespace';
import { PageStateNamespace } from '../../../page/model/state/types/PageStateNamespace';
import store from '../../../../../../store/store';
import { AppState } from '../../../../../../store/AppState';
import selectorStateNamespaces from '../../../selector/model/state/types/SelectorStateNamespace';
import { OwnProps } from '../view/TriggersPageLeftPaneView';

class TriggersPageLeftPaneController extends Controller<PageStateNamespace> {
  getState = (appState: AppState, { pageStateNamespace }: OwnProps) => ({
    isFullScreenModeActive: appState.headerState.isFullScreenModeActive,
    triggersPageLeftPaneGutterOffset: appState.common.pageStates[pageStateNamespace].pagePaneGutterOffset.leftPane,

    shouldShowTriggersPageLeftPane: appState.common.pageStates[pageStateNamespace].shouldShowPagePane.leftPane,

    shouldShowTriggersPageLeftPanePermanently:
      appState.common.pageStates[pageStateNamespace].shouldShowPagePanePermanently.leftPane,

    isTriggerDataSourceSelectorOpen:
      appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}TriggerDataSourceSelector`]]
        .isSelectorOpen,

    isTriggerGroupSelectorOpen:
      appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}TriggerGroupSelector`]]
        .isSelectorOpen,

    isTriggerSelectorOpen:
      appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}TriggerSelector`]].isSelectorOpen
  });

  getActionDispatchers = (stateNamespace: TriggersPageStateNamespace) => ({
    hideTriggersPageLeftPane: () => this.dispatch(new HidePagePaneAction(stateNamespace, 'leftPane'))
  });
}

export const controller = new TriggersPageLeftPaneController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
