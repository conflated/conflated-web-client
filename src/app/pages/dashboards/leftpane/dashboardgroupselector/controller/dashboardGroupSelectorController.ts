import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import ToggleShouldShowPagePanePermanentlyAction from '../../../../../common/components/page/model/actions/panevisibility/ToggleShouldShowPagePanePermanentlyAction';
import store from '../../../../../../store/store';
import { PageStateNamespace } from '../../../../../common/components/page/model/state/types/PageStateNamespace';
import { AppState } from '../../../../../../store/AppState';
import selectShownDashboardGroups from './selectors/selectShownDashboardGroups';
import { controller as selectorWithDefaultActionsController } from '../../../../../common/components/selectorwithactions/controller/selectorWithActionsController';
import { controller as dashboardsPageController } from '../../../controller/dashboardsPageController';
import { DashboardGroup } from '../../../model/state/types/DashboardGroup';
import StartRenamingDashboardGroupAction from '../model/actions/StartRenamingDashboardGroupAction';
import CancelRenamingDashboardGroupAction from '../model/actions/CancelRenamingDashboardGroupAction';
import FinishRenamingDashboardGroupAction from '../model/actions/FinishRenamingDashboardGroupAction';

class DashboardGroupSelectorController extends Controller<PageStateNamespace> {
  getState = (appState: AppState) =>
    OOReduxUtils.mergeOwnAndForeignState(appState.dashboardsPage.dashboardGroupSelectorState, {
      shownDashboardGroups: selectShownDashboardGroups(appState),
      selectedDashboardGroup: appState.dashboardsPage.dashboardsState.selectedDashboardGroup,
      isDashboardSelectorOpen: appState.common.selectorStates.dashboardSelector.isSelectorOpen,

      shouldShowDashboardsPageLeftPanePermanently:
        appState.common.pageStates.dashboardsPage.shouldShowPagePanePermanently.leftPane
    });

  actionDispatchers = {
    showDashboardGroup: dashboardsPageController.actionDispatchers.showDashboardGroup,

    toggleShouldShowDashboardsPageLeftPanePermanently: () =>
      this.dispatch(new ToggleShouldShowPagePanePermanentlyAction('dashboardsPage', 'leftPane')),

    toggleMaximizeSelector:
      selectorWithDefaultActionsController.getActionDispatchers('dashboardGroupSelector').toggleMaximizeSelector,

    startRenamingDashboardGroup: (dashboardGroup: DashboardGroup) =>
      this.dispatch(new StartRenamingDashboardGroupAction(dashboardGroup)),

    cancelRenamingDashboardGroup: (dashboardGroup: DashboardGroup) =>
      this.dispatch(new CancelRenamingDashboardGroupAction(dashboardGroup)),

    finishRenamingDashboardGroup: (dashboardGroup: DashboardGroup, newName: string) =>
      this.dispatch(new FinishRenamingDashboardGroupAction(dashboardGroup, newName))
  };
}

export const controller = new DashboardGroupSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
