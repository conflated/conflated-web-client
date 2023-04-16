/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChartAreaStateNamespace } from '../../../../model/state/types/ChartAreaStateNamespace';
import type { Chart } from '../../../model/state/Chart';

export default class ApexChartEventOptionsFactory {
  static createEventOptions(
    chart: Chart,
    stateNamespace: ChartAreaStateNamespace,
    actions: Record<string, (...args: any[]) => any>
  ): object {
    return {
      dataPointSelection: (event: object, chartContext: object, params: object) =>
        chart.handleDataPointSelectionOrDrilldown(event, chartContext, params, stateNamespace, actions)
    };
  }
}
