import { Controller } from 'oo-redux-utils2';
import HidePagePaneAction from '../../../../../common/components/page/model/actions/pane/visibility/HidePagePaneAction';
import { PageStateNamespace } from '../../../../../common/components/page/model/state/types/PageStateNamespace';
import store from '../../../../../../store/store';
import { AppState } from '../../../../../../store/AppState';

export default class DataExplorerPageRightPaneController extends Controller<PageStateNamespace> {
  getState = (appState: AppState) => ({
    isFullScreenModeActive: appState.headerState.isFullScreenModeActive,
    dragStartPosition: appState.common.pageStates.dataExplorerPage.pagePaneGutterPositionOnDragStart.rightPane,
    dataExplorerPageRightPaneGutterOffset: appState.common.pageStates.dataExplorerPage.pagePaneGutterOffset.rightPane,
    isFilterSelectorOpen: appState.common.selectorStates.dataExplorerPageFilterSelector.isSelectorOpen,
    isSortBySelectorOpen: appState.common.selectorStates.dataExplorerPageSortBySelector.isSelectorOpen,
    shouldShowDataExplorerPageRightPane: appState.common.pageStates.dataExplorerPage.shouldShowPagePane.rightPane,
    isDataPointsCountSelectorOpen:
      appState.common.selectorStates.dataExplorerPageDataPointsCountSelector.isSelectorOpen,

    shouldShowDataExplorerPageRightPanePermanently:
      appState.common.pageStates.dataExplorerPage.shouldShowPagePanePermanently.rightPane
  });

  actionDispatchers = {
    hideDataExplorerPageRightPane: () => this.dispatch(new HidePagePaneAction('dataExplorerPage', 'rightPane'))
  };
}

export const controller = new DataExplorerPageRightPaneController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
