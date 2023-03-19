import { Controller } from 'oo-redux-utils2';
import ChangeXAxisCategoriesShownCountForSelectedChartAction from '../../../chartarea/model/actions/chart/selected/change/datapointscount/ChangeXAxisCategoriesShownCountForSelectedChartAction';
import type { ChartAreaStateNamespace } from '../../../chartarea/model/state/types/ChartAreaStateNamespace';
import ChangeFetchedRowCountForSelectedChartAction from '../../../chartarea/model/actions/chart/selected/change/datapointscount/ChangeFetchedRowCountForSelectedChartAction';
import store from '../../../../../../store/store';
import { AppState } from '../../../../../../store/AppState';
import { OwnProps } from '../view/DataPointsCountSelectorView';
import { DataPointsCountSelectorStateNamespace } from '../model/state/DataPointsCountSelectorStateNamespace';

class DataPointsCountSelectorController extends Controller<ChartAreaStateNamespace> {
  getState = (appState: AppState, { stateNamespace }: OwnProps) => ({
    selectedChart: appState[stateNamespace].chartAreaState.selectedChart
  });

  getActionDispatchers = (stateNamespace: DataPointsCountSelectorStateNamespace) => ({
    changeFetchedRowCountForSelectedChart: (fetchedRowCount: string) => {
      this.dispatch(new ChangeFetchedRowCountForSelectedChartAction(stateNamespace, fetchedRowCount));
    },

    changeXAxisCategoriesShownCountForSelectedChart: (xAxisCategoriesShownCount: string) =>
      this.dispatch(
        new ChangeXAxisCategoriesShownCountForSelectedChartAction(stateNamespace, xAxisCategoriesShownCount)
      )
  });
}

export const controller = new DataPointsCountSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
