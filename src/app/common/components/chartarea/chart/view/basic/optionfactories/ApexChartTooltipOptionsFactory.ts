import type { Chart } from '../../../model/state/Chart';

export default class ApexChartTooltipOptionsFactory {
  static createTooltipOptions(chart: Chart): object {
    const isDarkModeActive = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    return {
      enabled: true,
      shared: chart.hasSharedTooltip(),
      intersect: chart.hasIntersectTooltip(),
      followCursor: chart.hasFollowCursorTooltip(),
      theme: isDarkModeActive ? 'dark' : 'light',
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
