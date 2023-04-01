import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import ToggleLayoutLockedAction from '../model/actions/ToggleLayoutLockedAction';
import ToggleShouldShowPagePanePermanentlyAction from '../../../../../../../common/components/page/model/actions/panevisibility/ToggleShouldShowPagePanePermanentlyAction';
import type { Layout } from '../../../../../../../common/components/chartarea/model/state/types/Layout';
import ChangeChartAreaLayoutAction from '../../../../../../../common/components/chartarea/model/actions/layout/ChangeChartAreaLayoutAction';
import { PageStateNamespace } from '../../../../../../../common/components/page/model/state/types/PageStateNamespace';
import store from '../../../../../../../../store/store';
import { AppState } from '../../../../../../../../store/AppState';

export default class LayoutSelectorController extends Controller<PageStateNamespace | ''> {
  getState = (appState: AppState) =>
    OOReduxUtils.mergeOwnAndForeignState(appState.dataExplorerPage.layoutSelectorState, {
      layout: appState.dataExplorerPage.chartAreaState.layout,

      shouldShowDataExplorerPageLeftPanePermanently:
        appState.common.pageStates.dataExplorerPage.shouldShowPagePanePermanently.leftPane
    });

  actionDispatchers = {
    toggleLayoutLocked: () => this.dispatch(new ToggleLayoutLockedAction()),
    selectLayout: (layout: Layout) => this.dispatch(new ChangeChartAreaLayoutAction('dataExplorerPage', layout)),

    toggleShouldShowDataExplorerPageLeftPanePermanently: () =>
      this.dispatch(new ToggleShouldShowPagePanePermanentlyAction('dataExplorerPage', 'leftPane'))
  };
}

export const controller = new LayoutSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
