import { Controller } from 'oo-redux-utils2';
import ChangeXAxisCategoriesShownCountForSelectedChartAction from '../../chartarea/model/actions/chart/selected/change/datapointscount/ChangeXAxisCategoriesShownCountForSelectedChartAction';
import type { ChartAreaPageStateNamespace } from '../../chartarea/model/state/types/ChartAreaPageStateNamespace';
import ChangeFetchedRowCountForSelectedChartAction from '../../chartarea/model/actions/chart/selected/change/datapointscount/ChangeFetchedRowCountForSelectedChartAction';
import store from '../../../../../store/store';
import { AppState } from '../../../../../store/AppState';
import { OwnProps } from '../view/DataPointsCountSelectorView';
import { DataPointsCountSelectorPageStateNamespace } from '../model/state/DataPointsCountSelectorPageStateNamespace';

class DataPointsCountSelectorController extends Controller<ChartAreaPageStateNamespace> {
  getState = (appState: AppState, { pageStateNamespace }: OwnProps) => ({
    selectedChart: appState[pageStateNamespace].chartAreaState.selectedChart
  });

  getActionDispatchers = (pageStateNamespace: DataPointsCountSelectorPageStateNamespace) => ({
    changeFetchedRowCountForSelectedChart: (fetchedRowCount: string) => {
      this.dispatch(new ChangeFetchedRowCountForSelectedChartAction(pageStateNamespace, fetchedRowCount));
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
