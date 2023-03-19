import _ from 'lodash';
import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { Chart } from '../../../../chart/model/state/Chart';
import type { ChartAreaStateNamespace } from '../../../state/types/ChartAreaStateNamespace';
import type { SelectedDimension } from '../../../../chart/model/state/selecteddimension/SelectedDimension';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import StartFetchDataForOtherChartsAction from '../fetchdata/StartFetchDataForOtherChartsAction';
import diContainer from '../../../../../../../../di/diContainer';

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
    this.dispatchWithDi(StartFetchDataForOtherChartsAction, diContainer, {
      chart: this.chart,
      stateNamespace: this.stateNamespace
    });

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
