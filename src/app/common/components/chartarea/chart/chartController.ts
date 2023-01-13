import store from '../../../../../store/store';
import type { ChartAreaPageStateNamespace } from '../model/state/namespace/ChartAreaPageStateNamespace';
import SelectChartAction from '../model/actions/chart/SelectChartAction';
import DeselectChartDataPointAction from '../model/actions/chart/datapointselection/DeselectChartDataPointAction';
import SelectChartDataPointAction from '../model/actions/chart/datapointselection/SelectChartDataPointAction';
import SetSelectedDataPointIndexForChartAction from '../model/actions/chart/datapointselection/SetSelectedDataPointIndexForChartAction';
import DrillDownChartAction from '../model/actions/chart/drill/DrillDownChartAction';
import type { SelectedDimension } from './model/state/selecteddimension/SelectedDimension';
import AddSelectionFilterToNotSelectedChartsAction from '../model/actions/chart/notselected/AddSelectionFilterToNotSelectedChartsAction';
import StartFetchDataForOtherChartsAction from '../model/actions/chart/fetchdata/StartFetchDataForOtherChartsAction';
import diContainer from '../../../../../di/diContainer';
import StartFetchDataForSelectedChartAction from '../model/actions/chart/selected/fetchdata/StartFetchDataForSelectedChartAction';
import type { DataPoint } from './model/state/types/DataPoint';
import RemoveSelectionFilterFromNotSelectedChartsAction from '../model/actions/chart/notselected/RemoveSelectionFilterFromNotSelectedChartsAction';
import type { DrillDown } from './model/state/types/DrillDown';
import type { Chart } from './model/state/Chart';
import StartFetchDataForChartAction from '../model/actions/chart/fetchdata/StartFetchDataForChartAction';
import Controller from '../../../../../Controller';

class ChartController extends Controller<ChartAreaPageStateNamespace> {
  getActionDispatchers(stateNamespace: ChartAreaPageStateNamespace) {
    return {
      selectChart: (chart: Chart) => this.dispatch(new SelectChartAction(stateNamespace, chart)),

      deselectChartDataPoint: (chart: Chart, dataPoint: DataPoint) =>
        this.dispatch(new DeselectChartDataPointAction(stateNamespace, chart, dataPoint)),

      selectChartDataPoint: (chart: Chart, dataPoint: DataPoint) =>
        this.dispatch(new SelectChartDataPointAction(stateNamespace, chart, dataPoint)),

      setSelectedDataPointIndexForChart: (chart: Chart, selectedDataPointIndex: number | undefined) =>
        this.dispatch(new SetSelectedDataPointIndexForChartAction(stateNamespace, chart, selectedDataPointIndex)),

      drillDownChart: (chart: Chart, drillDown: DrillDown, newDrillDownSelectedDimension: SelectedDimension) => {
        this.dispatch(new DrillDownChartAction(stateNamespace, chart, drillDown, newDrillDownSelectedDimension));
        this.dispatchWithDi(diContainer, StartFetchDataForChartAction, { chart });
      },

      removeSelectionFilterFromNotSelectedCharts: (chart: Chart) =>
        this.dispatch(new RemoveSelectionFilterFromNotSelectedChartsAction(stateNamespace, chart)),

      addSelectionFilterToNotSelectedChartsAction: (
        chart: Chart,
        selectedDimension: SelectedDimension,
        filterExpression: string
      ) => {
        this.dispatch(
          new AddSelectionFilterToNotSelectedChartsAction(
            stateNamespace,
            this.dispatch,
            chart,
            selectedDimension,
            filterExpression
          )
        );

        this.dispatchWithDi(diContainer, StartFetchDataForOtherChartsAction, { chart });
      },

      startFetchDataForOtherCharts: (chart: Chart) =>
        this.dispatchWithDi(diContainer, StartFetchDataForOtherChartsAction, { chart }),
      startFetchDataForSelectedChart: () => this.dispatchWithDi(diContainer, StartFetchDataForSelectedChartAction, {})
    };
  }
}

export const controller = new ChartController(store.dispatch);
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
