import { Controller } from 'oo-redux-utils2';
import ChangeXAxisCategoriesShownCountForSelectedChartAction from '../chartarea/model/actions/chart/selected/change/datapointscount/ChangeXAxisCategoriesShownCountForSelectedChartAction';
import type { ChartAreaPageStateNamespace } from '../chartarea/model/state/types/ChartAreaPageStateNamespace';
import ChangeFetchedRowCountForSelectedChartAction from '../chartarea/model/actions/chart/selected/change/datapointscount/ChangeFetchedRowCountForSelectedChartAction';
import diContainer from '../../../../di/diContainer';
import StartFetchDataForSelectedChartAction from '../chartarea/model/actions/chart/selected/fetchdata/StartFetchDataForSelectedChartAction';
import store from '../../../../store/store';
import { AppState } from '../../../../store/AppState';

class DataPointsCountSelectorController extends Controller<ChartAreaPageStateNamespace> {
  getState(appState: AppState, pageStateNamespace: ChartAreaPageStateNamespace) {
    return {
      selectedChart: appState[pageStateNamespace].chartAreaState.selectedChart
    };
  }

  getActionDispatchers(stateNamespace: ChartAreaPageStateNamespace) {
    return {
      changeFetchedRowCountForSelectedChart: (fetchedRowCount: string) => {
        this.dispatch(new ChangeFetchedRowCountForSelectedChartAction(stateNamespace, fetchedRowCount));
        this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {});
      },

      changeXAxisCategoriesShownCountForSelectedChart: (xAxisCategoriesShownCount: string) =>
        this.dispatch(
          new ChangeXAxisCategoriesShownCountForSelectedChartAction(stateNamespace, xAxisCategoriesShownCount)
        )
    };
  }
}

export const controller = new DataPointsCountSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
