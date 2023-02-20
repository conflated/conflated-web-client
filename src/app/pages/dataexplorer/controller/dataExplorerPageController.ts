import { Controller } from 'oo-redux-utils2';
import store from '../../../../store/store';
import { AppState } from '../../../../store/AppState';

class DataExplorerPageController extends Controller {
  getState = (appState: AppState) => ({
    isFullScreenModeActive: appState.headerState.isFullScreenModeActive
  });
}

export const controller = new DataExplorerPageController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
