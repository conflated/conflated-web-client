import { Controller } from 'oo-redux-utils2';
import store from '../../../../../../store/store';
import { PageStateNamespace } from '../../../../../common/components/page/model/state/types/PageStateNamespace';
import { AppState } from '../../../../../../store/AppState';
import { controller as selectorWithDefaultActionsController } from '../../../../../common/components/selectorwithactions/controller/selectorWithActionsController';

class ReportTemplateSelectorController extends Controller<PageStateNamespace> {
  getState = (appState: AppState) => ({
    shownDashboards: selectShownReportTemplates(appState),
    selectedDashboard: appState.reportsPage.reportsState.selectedDashboard,
    isReportTemplateGroupSelectorOpen: appState.common.selectorStates.reportTemplateGroupSelector.isSelectorOpen
  });

  actionDispatchers = {
    toggleMaximizeSelector:
      selectorWithDefaultActionsController.getActionDispatchers('dashboardGroupSelector').toggleMaximizeSelector,

    showDashboard: dashboardsPageController.actionDispatchers.showDashboard
  };
}

export const controller = new DashboardSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
