import { Controller } from 'oo-redux-utils2';
import store from '../../../../../../store/store';
import { PageStateNamespace } from '../../../../../common/components/page/model/state/types/PageStateNamespace';
import { AppState } from '../../../../../../store/AppState';
import { controller as selectorWithDefaultActionsController } from '../../../../../common/components/selectorwithactions/controller/selectorWithActionsController';
import GenerateReportAction from '../../../model/actions/GenerateReportAction';
import { ReportTemplate } from '../../../model/state/types/ReportTemplate';
import selectShownReportTemplates from './selectors/selectShownReportTemplates';

class ReportTemplateSelectorController extends Controller<PageStateNamespace> {
  getState = (appState: AppState) => ({
    shownReportTemplates: selectShownReportTemplates(appState),
    isReportTemplateGroupSelectorOpen: appState.common.selectorStates.reportTemplateGroupSelector.isSelectorOpen
  });

  actionDispatchers = {
    toggleMaximizeSelector:
      selectorWithDefaultActionsController.getActionDispatchers('dashboardGroupSelector').toggleMaximizeSelector,

    generateReport: (reportTemplate: ReportTemplate) => this.dispatch(new GenerateReportAction(reportTemplate))
  };
}

export const controller = new ReportTemplateSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
