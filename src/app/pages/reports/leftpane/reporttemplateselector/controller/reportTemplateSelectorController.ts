import { Controller } from 'oo-redux-utils2';
import store from '../../../../../../store/store';
import { PageStateNamespace } from '../../../../../common/components/page/model/state/types/PageStateNamespace';
import { AppState } from '../../../../../../store/AppState';
import { controller as selectorWithDefaultActionsController } from '../../../../../common/components/selectorwithactions/controller/selectorWithActionsController';
import selectShownReportTemplates from './selectors/selectShownReportTemplates';
import OpenAction from '../../../generatereportdialog/model/actions/OpenAction';

class ReportTemplateSelectorController extends Controller<PageStateNamespace> {
  getState = (appState: AppState) => ({
    shownReportTemplates: selectShownReportTemplates(appState),
    isReportTemplateGroupSelectorOpen: appState.common.selectorStates.reportTemplateGroupSelector.isSelectorOpen
  });

  actionDispatchers = {
    toggleMaximizeSelector:
      selectorWithDefaultActionsController.getActionDispatchers('dashboardGroupSelector').toggleMaximizeSelector,

    openGenerateReportDialog: () => this.dispatch(new OpenAction())
  };
}

export const controller = new ReportTemplateSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
