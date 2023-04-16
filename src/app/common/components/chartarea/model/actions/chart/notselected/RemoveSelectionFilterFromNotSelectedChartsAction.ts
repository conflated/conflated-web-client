import _ from 'lodash';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { Chart } from '../../../../chart/model/state/Chart';
import type { ChartAreaStateNamespace } from '../../../state/types/ChartAreaStateNamespace';

export default class RemoveSelectionFilterFromNotSelectedChartsAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly selectedChart: Chart | null | undefined) {
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
              chart.filters.removeSelectionFilter(this.selectedChart.id);
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
