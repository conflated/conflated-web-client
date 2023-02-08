import _ from 'lodash';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { ChartType } from '../../../../../../chart/model/state/types/ChartType';
import type { ChartAreaPageStateNamespace } from '../../../../../state/types/ChartAreaPageStateNamespace';

export default class ChangeChartTypeForSelectedChartAction extends AbstractChartAreaAction {
  readonly chartType: ChartType;

  constructor(stateNamespace: ChartAreaPageStateNamespace, chartType: ChartType) {
    super(stateNamespace);
    this.chartType = chartType;
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { charts, selectedChart } = currentState;

    const newChartType =
      selectedChart.chartType === 'boxplot' && this.chartType === 'boxplot' ? 'violin' : this.chartType;

    const newChart = selectedChart.getNewChartOfType(newChartType);

    const newState = {
      ...currentState,
      charts: [..._.without(charts, selectedChart), newChart],
      selectedChart: newChart
    };

    return newState;
  }
}
