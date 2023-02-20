import type { Chart } from '../../../../model/state/Chart';

export default class ApexChartStrokeOptionsFactory {
  static createStrokeOptions(chart: Chart): object {
    return {
      show: chart.shouldShowStroke(),
      curve: 'straight',
      width: chart.getStrokeWidth()
    };
  }
}
