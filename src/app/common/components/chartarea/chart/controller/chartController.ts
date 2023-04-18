import { Controller } from 'oo-redux-utils2';
import SelectChartAction from '../../model/actions/chart/SelectChartAction';
import DeselectChartDataPointAction from '../../model/actions/chart/datapointselection/DeselectChartDataPointAction';
import SelectChartDataPointAction from '../../model/actions/chart/datapointselection/SelectChartDataPointAction';
import SetSelectedDataPointIndexForChartAction from '../../model/actions/chart/datapointselection/SetSelectedDataPointIndexForChartAction';
import DrillDownChartAction from '../../model/actions/chart/drill/DrillDownChartAction';
import type { SelectedDimension } from '../model/state/selecteddimension/SelectedDimension';
import ChangeFilterExpressionForChartFiltersAction from '../../model/actions/chart/filter/ChangeFilterExpressionForChartFiltersAction';
import StartFetchDataForOtherChartsAction from '../../model/actions/chart/fetchdata/StartFetchDataForOtherChartsAction';
import diContainer from '../../../../../../di/diContainer';
import StartFetchDataForSelectedChartAction from '../../model/actions/chart/selected/fetchdata/StartFetchDataForSelectedChartAction';
import type { DataPoint } from '../model/state/types/DataPoint';
import type { DrillDown } from '../model/state/types/DrillDown';
import type { Chart } from '../model/state/Chart';
import ChangeXAxisScrollPositionForSelectedChartAction from '../../model/actions/chart/selected/change/scrollposition/ChangeXAxisScrollPositionForSelectedChartAction';
import { ChartAreaStateNamespace } from '../../model/state/types/ChartAreaStateNamespace';
import MaximizeChartSizeAction from '../../model/actions/chart/sizing/MaximizeChartSizeAction';
import RestoreChartOriginalSizeAction from '../../model/actions/chart/sizing/RestoreChartOriginalSizeAction';
import ChangeChartQuickFilterChartAction from '../../model/actions/chart/ChangeChartQuickFilterAction';

export default class ChartController extends Controller<ChartAreaStateNamespace> {
  getActionDispatchers = (stateNamespace: ChartAreaStateNamespace) => ({
    select: (chart: Chart) => this.dispatch(new SelectChartAction(stateNamespace, chart)),
    maximizeSize: (chart: Chart) => this.dispatch(new MaximizeChartSizeAction(stateNamespace, chart)),
    restoreChartOriginalSize: () => this.dispatch(new RestoreChartOriginalSizeAction(stateNamespace)),

    changeQuickFilter: (chart: Chart, filterExpression: string) =>
      this.dispatch(new ChangeChartQuickFilterChartAction(stateNamespace, chart, filterExpression)),

    deselectDataPoint: (chart: Chart, dataPoint: DataPoint) =>
      this.dispatch(new DeselectChartDataPointAction(stateNamespace, chart, dataPoint)),

    selectDataPoint: (chart: Chart, dataPoint: DataPoint) =>
      this.dispatch(new SelectChartDataPointAction(stateNamespace, chart, dataPoint)),

    setSelectedDataPointIndex: (chart: Chart, selectedDataPointIndex: number | undefined) =>
      this.dispatch(new SetSelectedDataPointIndexForChartAction(stateNamespace, chart, selectedDataPointIndex)),

    drillDown: (chart: Chart, drillDown: DrillDown, newDrillDownSelectedDimension: SelectedDimension) =>
      this.dispatch(new DrillDownChartAction(stateNamespace, chart, drillDown, newDrillDownSelectedDimension)),

    changeFilterExpressionForChartFilters: (filteringChart: Chart, filterExpression: string) =>
      this.dispatch(new ChangeFilterExpressionForChartFiltersAction(stateNamespace, filteringChart, filterExpression)),

    startFetchDataForOtherCharts: (chart: Chart) =>
      this.dispatchWithDi(StartFetchDataForOtherChartsAction, diContainer, { chart, stateNamespace }),

    startFetchDataForSelectedChart: () =>
      this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, { stateNamespace }),

    changeXAxisScrollPosition: (chart: Chart, xAxisScrollPosition: number) =>
      this.dispatch(new ChangeXAxisScrollPositionForSelectedChartAction(stateNamespace, chart, xAxisScrollPosition))
  });
}
