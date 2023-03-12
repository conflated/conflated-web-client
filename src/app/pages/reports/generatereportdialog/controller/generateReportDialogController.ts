import { Controller } from 'oo-redux-utils2';
import { AppState } from '../../../../../store/AppState';
import store from '../../../../../store/store';
import CloseGenerateReportDialogAction from '../model/actions/CloseGenerateReportDialogAction';

class GenerateReportDialogController extends Controller {
  getState = (appState: AppState) => appState.reportsPage.generateReportDialogState;

  readonly actionDispatchers = {
    close: () => this.dispatch(new CloseGenerateReportDialogAction())
  };
}

export const controller = new GenerateReportDialogController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
