import _ from 'lodash';
import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { Chart } from '../../../../chart/model/state/Chart';
import type { ChartAreaPageStateNamespace } from '../../../state/types/ChartAreaPageStateNamespace';
import type { SelectedDimension } from '../../../../chart/model/state/selecteddimension/SelectedDimension';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';

export default class AddSelectionFilterToNotSelectedChartsAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaPageStateNamespace,
    private readonly chart: Chart,
    private readonly selectedDimension: SelectedDimension,
    private readonly filterExpression: string
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { charts } = currentState;

    const newState = {
      ...currentState,
      charts: [
        this.chart,
        ..._.without(charts, this.chart).map((chart: Chart): Chart => {
          chart.selectedFilters.addSelectionFilter(this.chart.id, this.selectedDimension, this.filterExpression);
          return chart;
        })
      ]
    };

    return newState;
  }
}
