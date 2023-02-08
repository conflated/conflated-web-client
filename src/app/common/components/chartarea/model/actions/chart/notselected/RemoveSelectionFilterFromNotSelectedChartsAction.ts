import _ from 'lodash';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { Chart } from '../../../../chart/model/state/Chart';
import type { ChartAreaPageStateNamespace } from '../../../state/namespace/ChartAreaPageStateNamespace';

export default class RemoveSelectionFilterFromNotSelectedChartsAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly selectedChart: Chart | null | undefined) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { charts } = currentState;

    if (this.selectedChart != null) {
      const newState = {
        ...currentState,
        charts: [
          this.selectedChart,
          ..._.without(charts, this.selectedChart).map((chart: Chart): Chart => {
            if (this.selectedChart != null) {
              chart.selectedFilters.removeSelectionFilter(this.selectedChart.id);
            }

            return chart;
          })
        ]
      };

      return newState;
    }

    return currentState;
  }
}
