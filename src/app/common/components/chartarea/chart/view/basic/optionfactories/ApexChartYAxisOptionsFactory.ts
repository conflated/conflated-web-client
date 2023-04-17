import type { Chart } from '../../../model/state/Chart';

export default class ApexChartYAxisOptionsFactory {
  static createYAxisOptions(chart: Chart): object {
    return {
      show: chart.hasData() && chart.type !== 'sparkline',
      tooltip: {
        enabled: chart.shouldShowYAxisTooltip()
      },
      title: chart.getApexYAxisTitleOptions()
    };
  }
}
