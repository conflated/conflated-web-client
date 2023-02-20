import type { Chart } from '../../../../model/state/Chart';

export default class ApexChartTooltipOptionsFactory {
  static createTooltipOptions(chart: Chart): object {
    return {
      enabled: true,
      shared: chart.hasSharedTooltip(),
      intersect: chart.hasIntersectTooltip(),
      followCursor: chart.hasFollowCursorTooltip(),
      x: {
        format: 'dd MMM HH:mm',
        formatter: chart.getTooltipXValueFormatter()
      },
      y: {
        formatter: chart.getTooltipYValueFormatter()
      }
    };
  }
}
