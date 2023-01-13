import type { ChartAreaPageStateNamespace } from '../../../../../../model/state/namespace/ChartAreaPageStateNamespace';
import type { Chart } from '../../../../../model/state/Chart';
import { ActionDispatchers } from '../../../../../chartController';

export default class ApexChartEventOptionsFactory {
  static createEventOptions(
    chart: Chart,
    stateNamespace: ChartAreaPageStateNamespace,
    actions: ActionDispatchers
  ): object {
    return {
      click: () => actions.selectChart(chart),
      dataPointSelection: (event: object, chartContext: object, params: object) =>
        chart.handleDataPointSelection(event, chartContext, params, stateNamespace, actions)
    };
  }
}
