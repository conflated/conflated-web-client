/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChartAreaPageStateNamespace } from '../../../../../model/state/types/ChartAreaPageStateNamespace';
import type { Chart } from '../../../../model/state/Chart';

export default class ApexChartEventOptionsFactory {
  static createEventOptions(
    chart: Chart,
    stateNamespace: ChartAreaPageStateNamespace,
    actions: Record<string, (...args: any[]) => any>
  ): object {
    return {
      click: () => actions.selectChart(chart),
      dataPointSelection: (event: object, chartContext: object, params: object) =>
        chart.handleDataPointSelection(event, chartContext, params, stateNamespace, actions)
    };
  }
}
