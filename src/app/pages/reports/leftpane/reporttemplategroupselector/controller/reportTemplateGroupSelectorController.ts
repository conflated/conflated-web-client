import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import ToggleShouldShowPagePanePermanentlyAction from '../../../../../common/components/page/model/actions/panevisibility/ToggleShouldShowPagePanePermanentlyAction';
import store from '../../../../../../store/store';
import { PageStateNamespace } from '../../../../../common/components/page/model/state/types/PageStateNamespace';
import { AppState } from '../../../../../../store/AppState';
import { controller as selectorWithDefaultActionsController } from '../../../../../common/components/selectorwithactions/controller/selectorWithActionsController';
import selectShownReportTemplateGroups from './selectors/selectShownReportTemplateGroups';
import { ReportTemplateGroup } from '../../../model/state/types/ReportTemplateGroup';
import StartRenamingAction from '../model/actions/rename/StartRenamingAction';
import CancelRenamingAction from '../model/actions/rename/CancelRenamingAction';
import FinishRenamingAction from '../model/actions/rename/FinishRenamingAction';
import ShowDeleteConfirmationDialogAction from '../model/actions/delete/ShowDeleteConfirmationDialogAction';
import CloseDeleteConfirmationDialogAction from '../model/actions/delete/CloseDeleteConfirmationDialogAction';
import ConfirmDeleteAction from '../model/actions/delete/ConfirmDeleteAction';

class ReportTemplateGroupSelectorController extends Controller<PageStateNamespace> {
  getState = (appState: AppState) =>
    OOReduxUtils.mergeOwnAndForeignState(appState.reportsPage.reportTemplateGroupSelectorState, {
      shownDashboardGroups: selectShownReportTemplateGroups(appState),

      isListItemReorderModeActive:
        appState.common.selectorWithDefaultActionsStates.reportTemplateGoupSelector.isListItemReorderModeActive,

      isReportTemplateSelectorOpen: appState.common.selectorStates.reportTemplateSelector.isSelectorOpen,
      shouldLeftPanePermanently: appState.common.pageStates.reportsPage.shouldShowPagePanePermanently.leftPane
    });

  actionDispatchers = {
    toggleShouldShowLeftPanePermanently: () =>
      this.dispatch(new ToggleShouldShowPagePanePermanentlyAction('reportsPage', 'leftPane')),

    toggleMaximizeSelector:
      selectorWithDefaultActionsController.getActionDispatchers('reportTemplateGroupSelector').toggleMaximizeSelector,

    startRenaming: (reportTemplateGroup: ReportTemplateGroup) =>
      this.dispatch(new StartRenamingAction(reportTemplateGroup)),

    cancelRenaming: (reportTemplateGroup: ReportTemplateGroup) =>
      this.dispatch(new CancelRenamingAction(reportTemplateGroup)),

    finishRenaming: (reportTemplateGroup: ReportTemplateGroup, newName: string) =>
      this.dispatch(new FinishRenamingAction(reportTemplateGroup, newName)),

    showDeleteConfirmationDialog: (reportTemplateGroup: ReportTemplateGroup) =>
      this.dispatch(new ShowDeleteConfirmationDialogAction(reportTemplateGroup)),

    closeDeleteConfirmationDialog: () => this.dispatch(new CloseDeleteConfirmationDialogAction()),

    confirmDelete: (reportTemplateGroup?: ReportTemplateGroup) =>
      this.dispatch(new ConfirmDeleteAction(reportTemplateGroup))
  };
}

export const controller = new ReportTemplateGroupSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;