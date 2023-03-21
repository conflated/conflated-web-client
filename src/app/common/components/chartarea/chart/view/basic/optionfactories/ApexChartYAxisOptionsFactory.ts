import type { Chart } from '../../../model/state/Chart';

export default class ApexChartYAxisOptionsFactory {
  static createYAxisOptions(chart: Chart): object {
    return {
      show: chart.hasData(),
      tooltip: {
        enabled: chart.shouldShowYAxisTooltip()
      }
    };
  }
}
