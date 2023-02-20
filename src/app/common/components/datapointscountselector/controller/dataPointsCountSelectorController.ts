import { Controller } from 'oo-redux-utils2';
import ChangeXAxisCategoriesShownCountForSelectedChartAction from '../../chartarea/model/actions/chart/selected/change/datapointscount/ChangeXAxisCategoriesShownCountForSelectedChartAction';
import type { ChartAreaPageStateNamespace } from '../../chartarea/model/state/types/ChartAreaPageStateNamespace';
import ChangeFetchedRowCountForSelectedChartAction from '../../chartarea/model/actions/chart/selected/change/datapointscount/ChangeFetchedRowCountForSelectedChartAction';
import diContainer from '../../../../../di/diContainer';
import StartFetchDataForSelectedChartAction from '../../chartarea/model/actions/chart/selected/fetchdata/StartFetchDataForSelectedChartAction';
import store from '../../../../../store/store';
import { AppState } from '../../../../../store/AppState';
import { OwnProps } from '../view/DataPointsCountSelectorView';

class DataPointsCountSelectorController extends Controller<ChartAreaPageStateNamespace> {
  getState(appState: AppState, { pageStateNamespace }: OwnProps) {
    return {
      selectedChart: appState[pageStateNamespace].chartAreaState.selectedChart
    };
  }

  getActionDispatchers = (_: unknown, { pageStateNamespace }: OwnProps) => ({
    changeFetchedRowCountForSelectedChart: (fetchedRowCount: string) => {
      this.dispatch(new ChangeFetchedRowCountForSelectedChartAction(pageStateNamespace, fetchedRowCount));
      this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {});
    },

    changeXAxisCategoriesShownCountForSelectedChart: (xAxisCategoriesShownCount: string) =>
      this.dispatch(
        new ChangeXAxisCategoriesShownCountForSelectedChartAction(pageStateNamespace, xAxisCategoriesShownCount)
      )
  });
}

export const controller = new DataPointsCountSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
