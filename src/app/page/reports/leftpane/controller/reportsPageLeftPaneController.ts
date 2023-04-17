import { Controller } from 'oo-redux-utils2';
import HidePagePaneAction from '../../../../common/components/page/model/actions/pane/visibility/HidePagePaneAction';
import { PageStateNamespace } from '../../../../common/components/page/model/state/types/PageStateNamespace';
import store from '../../../../../store/store';
import { AppState } from '../../../../../store/AppState';

class ReportsPageLeftPaneController extends Controller<PageStateNamespace> {
  getState = (appState: AppState) => ({
    isFullScreenModeActive: appState.headerState.isFullScreenModeActive,
    dragStartPosition: appState.common.pageStates.reportsPage.pagePaneGutterPositionOnDragStart.leftPane,
    leftPaneGutterOffset: appState.common.pageStates.reportsPage.pagePaneGutterOffset.leftPane,
    shouldShowLeftPane: appState.common.pageStates.reportsPage.shouldShowPagePane.leftPane,
    isReportTemplateGroupSelectorOpen: appState.common.selectorStates.reportTemplateGroupSelector.isSelectorOpen,
    isReportTemplateSelectorOpen: appState.common.selectorStates.reportTemplateSelector.isSelectorOpen,
    shouldShowLeftPanePermanently: appState.common.pageStates.reportsPage.shouldShowPagePanePermanently.leftPane
  });

  actionDispatchers = {
    hideLeftPane: () => this.dispatch(new HidePagePaneAction('reportsPage', 'leftPane'))
  };
}

export const controller = new ReportsPageLeftPaneController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
