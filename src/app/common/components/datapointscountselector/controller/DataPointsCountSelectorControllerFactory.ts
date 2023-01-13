import { NamespacedControllerFactory } from 'oo-redux-utils';
import ChangeXAxisCategoriesShownCountForSelectedChartAction from '../../chartarea/model/actions/chart/selected/change/datapointscount/ChangeXAxisCategoriesShownCountForSelectedChartAction';
import type { ChartAreaPageStateNamespace } from '../../chartarea/model/state/namespace/ChartAreaPageStateNamespace';
import ChangeFetchedRowCountForSelectedChartAction from '../../chartarea/model/actions/chart/selected/change/datapointscount/ChangeFetchedRowCountForSelectedChartAction';
import diContainer from '../../../../../di/diContainer';
import StartFetchDataForSelectedChartAction from '../../chartarea/model/actions/chart/selected/fetchdata/StartFetchDataForSelectedChartAction';

export default class DataPointsCountSelectorControllerFactory extends NamespacedControllerFactory<ChartAreaPageStateNamespace> {
  changeFetchedRowCountForSelectedChart(fetchedRowCount: string) {
    this.dispatchAction(
      new ChangeFetchedRowCountForSelectedChartAction(this.stateNamespace, this.dispatchAction, fetchedRowCount)
    );

    this.dispatchActionWithDi(diContainer, StartFetchDataForSelectedChartAction, {});
  }

  changeXAxisCategoriesShownCountForSelectedChart(xAxisCategoriesShownCount: string) {
    this.dispatchAction(
      new ChangeXAxisCategoriesShownCountForSelectedChartAction(this.stateNamespace, xAxisCategoriesShownCount)
    );
  }

  createController() {
    return {
      changeFetchedRowCountForSelectedChart: this.changeFetchedRowCountForSelectedChart,
      changeXAxisCategoriesShownCountForSelectedChart: this.changeXAxisCategoriesShownCountForSelectedChart
    };
  }
}
