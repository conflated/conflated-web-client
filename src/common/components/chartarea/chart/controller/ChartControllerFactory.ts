import { NamespacedControllerFactory } from 'oo-redux-utils';
import type { ChartAreaPageStateNamespace } from '../../model/state/namespace/ChartAreaPageStateNamespace';
import SelectChartAction from '../../model/actions/chart/SelectChartAction';
import DeselectChartDataPointAction from '../../model/actions/chart/datapointselection/DeselectChartDataPointAction';
import SelectChartDataPointAction from '../../model/actions/chart/datapointselection/SelectChartDataPointAction';
import SetSelectedDataPointIndexForChartAction from '../../model/actions/chart/datapointselection/SetSelectedDataPointIndexForChartAction';
import DrillDownChartAction from '../../model/actions/chart/drill/DrillDownChartAction';
import type { SelectedDimension } from '../model/state/selecteddimension/SelectedDimension';
import AddSelectionFilterToNotSelectedChartsAction from '../../model/actions/chart/notselected/AddSelectionFilterToNotSelectedChartsAction';
import StartFetchDataForOtherChartsAction from '../../model/actions/chart/fetchdata/StartFetchDataForOtherChartsAction';
import diContainer from '../../../../../diContainer';
import StartFetchDataForSelectedChartAction from '../../model/actions/chart/selected/fetchdata/StartFetchDataForSelectedChartAction';
import type { DataPoint } from '../model/state/types/DataPoint';
import RemoveSelectionFilterFromNotSelectedChartsAction from '../../model/actions/chart/notselected/RemoveSelectionFilterFromNotSelectedChartsAction';
import type { DrillDown } from '../model/state/types/DrillDown';
import type { Chart } from '../model/state/Chart';
import StartFetchDataForChartAction from '../../model/actions/chart/fetchdata/StartFetchDataForChartAction';

export default class ChartControllerFactory extends NamespacedControllerFactory<ChartAreaPageStateNamespace> {
  selectChart(chart: Chart) {
    this.dispatchAction(new SelectChartAction(this.stateNamespace, chart));
  }

  deselectChartDataPoint(chart: Chart, dataPoint: DataPoint) {
    this.dispatchAction(new DeselectChartDataPointAction(this.stateNamespace, chart, dataPoint));
  }

  selectChartDataPoint(chart: Chart, dataPoint: DataPoint) {
    this.dispatchAction(new SelectChartDataPointAction(this.stateNamespace, chart, dataPoint));
  }

  setSelectedDataPointIndexForChart(chart: Chart, selectedDataPointIndex: number | undefined) {
    this.dispatchAction(
      new SetSelectedDataPointIndexForChartAction(this.stateNamespace, chart, selectedDataPointIndex)
    );
  }

  drillDownChart(chart: Chart, drillDown: DrillDown, newDrillDownSelectedDimension: SelectedDimension) {
    this.dispatchAction(new DrillDownChartAction(this.stateNamespace, chart, drillDown, newDrillDownSelectedDimension));
    this.dispatchActionWithDi(diContainer, StartFetchDataForChartAction, { chart });
  }

  removeSelectionFilterFromNotSelectedCharts(chart: Chart) {
    this.dispatchAction(new RemoveSelectionFilterFromNotSelectedChartsAction(this.stateNamespace, chart));
  }

  addSelectionFilterToNotSelectedChartsAction(
    chart: Chart,
    selectedDimension: SelectedDimension,
    filterExpression: string
  ) {
    this.dispatchAction(
      new AddSelectionFilterToNotSelectedChartsAction(
        this.stateNamespace,
        this.dispatchAction,
        chart,
        selectedDimension,
        filterExpression
      )
    );

    this.dispatchActionWithDi(diContainer, StartFetchDataForOtherChartsAction, { chart });
  }

  async startFetchDataForOtherCharts(chart: Chart): Promise<void> {
    this.dispatchActionWithDi(diContainer, StartFetchDataForOtherChartsAction, { chart });
  }

  async startFetchDataForSelectedChart(): Promise<void> {
    this.dispatchActionWithDi(diContainer, StartFetchDataForSelectedChartAction, {});
  }

  createController() {
    return {
      selectChart: this.selectChart,
      deselectChartDataPoint: this.deselectChartDataPoint,
      selectChartDataPoint: this.selectChartDataPoint,
      setSelectedDataPointIndexForChart: this.setSelectedDataPointIndexForChart,
      drillDownChart: this.drillDownChart,
      removeSelectionFilterFromNotSelectedCharts: this.removeSelectionFilterFromNotSelectedCharts,
      addSelectionFilterToNotSelectedChartsAction: this.addSelectionFilterToNotSelectedChartsAction,
      startFetchDataForOtherCharts: this.startFetchDataForOtherCharts,
      startFetchDataForSelectedChart: this.startFetchDataForSelectedChart
    };
  }
}
