import _ from 'lodash';
import { Controller } from 'oo-redux-utils2';
import type { ChartAreaPageStateNamespace } from '../../model/state/types/ChartAreaPageStateNamespace';
import SelectChartAction from '../../model/actions/chart/SelectChartAction';
import DeselectChartDataPointAction from '../../model/actions/chart/datapointselection/DeselectChartDataPointAction';
import SelectChartDataPointAction from '../../model/actions/chart/datapointselection/SelectChartDataPointAction';
import SetSelectedDataPointIndexForChartAction from '../../model/actions/chart/datapointselection/SetSelectedDataPointIndexForChartAction';
import DrillDownChartAction from '../../model/actions/chart/drill/DrillDownChartAction';
import type { SelectedDimension } from '../model/state/selecteddimension/SelectedDimension';
import AddSelectionFilterToNotSelectedChartsAction from '../../model/actions/chart/notselected/AddSelectionFilterToNotSelectedChartsAction';
import StartFetchDataForOtherChartsAction from '../../model/actions/chart/fetchdata/StartFetchDataForOtherChartsAction';
import diContainer from '../../../../../../di/diContainer';
import StartFetchDataForSelectedChartAction from '../../model/actions/chart/selected/fetchdata/StartFetchDataForSelectedChartAction';
import type { DataPoint } from '../model/state/types/DataPoint';
import RemoveSelectionFilterFromNotSelectedChartsAction from '../../model/actions/chart/notselected/RemoveSelectionFilterFromNotSelectedChartsAction';
import type { DrillDown } from '../model/state/types/DrillDown';
import type { Chart } from '../model/state/Chart';
import StartFetchDataForChartAction from '../../model/actions/chart/fetchdata/StartFetchDataForChartAction';
import { OwnProps } from '../view/ChartView';

export default class ChartController extends Controller<ChartAreaPageStateNamespace> {
  selectChart = _.debounce(
    (stateNamespace: ChartAreaPageStateNamespace, chart: Chart) =>
      this.dispatch(new SelectChartAction(stateNamespace, chart)),
    150
  );

  getActionDispatchers = (__: unknown, { pageStateNamespace }: OwnProps) => ({
    selectChart: (chart: Chart) => this.selectChart(pageStateNamespace, chart),

    deselectChartDataPoint: (chart: Chart, dataPoint: DataPoint) =>
      this.dispatch(new DeselectChartDataPointAction(pageStateNamespace, chart, dataPoint)),

    selectChartDataPoint: (chart: Chart, dataPoint: DataPoint) =>
      this.dispatch(new SelectChartDataPointAction(pageStateNamespace, chart, dataPoint)),

    setSelectedDataPointIndexForChart: (chart: Chart, selectedDataPointIndex: number | undefined) =>
      this.dispatch(new SetSelectedDataPointIndexForChartAction(pageStateNamespace, chart, selectedDataPointIndex)),

    drillDownChart: (chart: Chart, drillDown: DrillDown, newDrillDownSelectedDimension: SelectedDimension) => {
      this.dispatch(new DrillDownChartAction(pageStateNamespace, chart, drillDown, newDrillDownSelectedDimension));
      this.dispatchWithDi(StartFetchDataForChartAction, diContainer, { chart, pageStateNamespace });
    },

    removeSelectionFilterFromNotSelectedCharts: (chart: Chart) =>
      this.dispatch(new RemoveSelectionFilterFromNotSelectedChartsAction(pageStateNamespace, chart)),

    addSelectionFilterToNotSelectedChartsAction: (
      chart: Chart,
      selectedDimension: SelectedDimension,
      filterExpression: string
    ) => {
      this.dispatch(
        new AddSelectionFilterToNotSelectedChartsAction(pageStateNamespace, chart, selectedDimension, filterExpression)
      );

      this.dispatchWithDi(StartFetchDataForOtherChartsAction, diContainer, { chart, pageStateNamespace });
    },

    startFetchDataForOtherCharts: (chart: Chart) =>
      this.dispatchWithDi(StartFetchDataForOtherChartsAction, diContainer, { chart, pageStateNamespace }),

    startFetchDataForSelectedChart: () =>
      this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, { pageStateNamespace })
  });
}
