import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { Chart } from '../../../chart/model/state/Chart';
import type { ChartAreaStateNamespace } from '../../state/types/ChartAreaStateNamespace';
import ChartAreaStateUpdater from '../../state/utils/ChartAreaStateUpdater';

export default class ChangeChartQuickFilterChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly chart: Chart,
    private readonly filterExpression: string
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.chart.selectedFilters.removeQuickFilters();

    if (this.chart.selectedMeasures[0]) {
      const measureFilter = this.chart.selectedFilters.addMeasureFilter(
        this.chart.selectedMeasures[0].measure,
        'Quick filter'
      );

      const measureFilterExpression = this.filterExpression
        .split(',')
        .map((filterPart) => filterPart.trim())
        .map((filterPart) => filterPart.startsWith('>') || filterPart.startsWith('<') || filterPart.startsWith('='))
        .join(',');

      this.chart.selectedFilters.changeFilterExpression(measureFilter, measureFilterExpression);
    }

    if (this.chart.selectedDimensions[0]) {
      const dimensionFilter = this.chart.selectedFilters.addDimensionFilter(
        this.chart.selectedDimensions[0].dimension,
        'Quick filter'
      );

      const dimensionFilterExpression = this.filterExpression
        .split(',')
        .map((filterPart) => filterPart.trim())
        .map((filterPart) => !filterPart.startsWith('>') && !filterPart.startsWith('<') && !filterPart.startsWith('='))
        .join(',');

      this.chart.selectedFilters.changeFilterExpression(dimensionFilter, dimensionFilterExpression);
    }

    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, this.chart);
  }
}
