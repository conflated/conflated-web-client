import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import type { Chart } from '../../../../../chart/model/state/Chart';
import type { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';
import ChartAreaStateFactory from '../../../../state/ChartAreaStateFactory';

export default class ChangeChartQuickFilterChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly chart: Chart,
    private readonly filterExpression: string
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.chart.filters.removeQuickFilters();

    if (this.chart.selectedMeasures[0]) {
      const measureFilterExpression = this.filterExpression
        .split(',')
        .map((filterPart) => filterPart.trim())
        .filter((filterPart) => filterPart.startsWith('>') || filterPart.startsWith('<') || filterPart.startsWith('='))
        .join(',');

      if (measureFilterExpression) {
        const measureFilter = this.chart.filters.addMeasureFilter(
          this.chart.selectedMeasures[0].measure,
          'Quick filter'
        );

        this.chart.filters.changeFilterExpression(measureFilter, measureFilterExpression);
      }
    }

    if (this.chart.selectedDimensions[0]) {
      const dimensionFilterExpression = this.filterExpression
        .split(',')
        .map((filterPart) => filterPart.trim())
        .filter(
          (filterPart) => !filterPart.startsWith('>') && !filterPart.startsWith('<') && !filterPart.startsWith('=')
        )
        .join(',');

      if (dimensionFilterExpression) {
        const dimensionFilter = this.chart.filters.addDimensionFilter(
          this.chart.selectedDimensions[0].dimension,
          'Quick filter'
        );

        this.chart.filters.changeFilterExpression(dimensionFilter, dimensionFilterExpression);
      }
    }

    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, this.chart);
  }
}
