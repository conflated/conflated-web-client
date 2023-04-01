import { Controller } from 'oo-redux-utils2';
import HidePagePaneAction from '../../../../../common/components/page/model/actions/panevisibility/HidePagePaneAction';
import { PageStateNamespace } from '../../../../../common/components/page/model/state/types/PageStateNamespace';
import store from '../../../../../../store/store';
import { AppState } from '../../../../../../store/AppState';

class DataExplorerPageLeftPaneController extends Controller<PageStateNamespace> {
  getState = (appState: AppState) => ({
    isFullScreenModeActive: appState.headerState.isFullScreenModeActive,
    shouldShowDataExplorerPageLeftPane: appState.common.pageStates.dataExplorerPage.shouldShowPagePane.leftPane,
    dataExplorerPageLeftPaneGutterOffset: appState.common.pageStates.dataExplorerPage.pagePaneGutterOffset.leftPane,
    isDataSourceSelectorOpen: appState.common.selectorStates.dataSourceSelector.isSelectorOpen,
    isMeasureSelectorOpen: appState.common.selectorStates.measureSelector.isSelectorOpen,
    isDimensionSelectorOpen: appState.common.selectorStates.dimensionSelector.isSelectorOpen,

    shouldShowDataExplorerPageLeftPanePermanently:
      appState.common.pageStates.dataExplorerPage.shouldShowPagePanePermanently.leftPane
  });

  actionDispatchers = {
    hideDataExplorerPageLeftPane: () => this.dispatch(new HidePagePaneAction('dataExplorerPage', 'leftPane'))
  };
}

export const controller = new DataExplorerPageLeftPaneController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
