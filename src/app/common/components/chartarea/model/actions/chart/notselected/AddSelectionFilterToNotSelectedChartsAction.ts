import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { Chart } from '../../../../chart/model/state/Chart';
import type { ChartAreaStateNamespace } from '../../../state/types/ChartAreaStateNamespace';
import type { SelectedDimension } from '../../../../chart/model/state/selecteddimension/SelectedDimension';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import { isNot } from '../../../../../../utils/Utils';

export default class AddSelectionFilterToNotSelectedChartsAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly chart: Chart,
    private readonly selectedDimension: SelectedDimension,
    private readonly filterExpression: string
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    /* if (this.filter.dataScopeType === 'all') {
      this.dispatchWithDi(StartFetchDataForOtherChartsAction, diContainer, {
        chart: this.chart,
        stateNamespace: this.stateNamespace
      });
    } */

    const { charts } = currentState;

    return {
      ...currentState,
      charts: [
        this.chart,
        ...charts.filter(isNot(this.chart)).map((chart: Chart): Chart => {
          chart.filters.addSelectionFilter(this.chart.id, this.selectedDimension, this.filterExpression);
          return chart;
        })
      ]
    };
  }
}
