import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import diContainer from '../../../../di/diContainer';
import { ChartAreaPageStateNamespace } from '../../../common/components/chartarea/model/state/types/ChartAreaPageStateNamespace';
import store from '../../../../store/store';
import { AppState } from '../../../../store/AppState';
import { ReportTemplate } from '../model/state/types/ReportTemplate';

class ReportsPageController extends Controller<ChartAreaPageStateNamespace | ''> {
  getState = (appState: AppState) => OOReduxUtils.mergeOwnAndForeignState(appState.reportsPage.reportsState, {});

  readonly actionDispatchers = {
    generateReport: (reportTemplate: ReportTemplate) => this.dispatch(new GenerateReportAction(reportTemplate)),
    startFetchReportTemplateGroups: () => this.dispatchWithDi(StartFetchReportTemplateGroupsAction, diContainer, {})
  };
}

export const controller = new ReportsPageController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
