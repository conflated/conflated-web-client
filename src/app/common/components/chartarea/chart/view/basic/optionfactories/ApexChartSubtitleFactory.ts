import type { Chart } from '../../../model/state/Chart';

export default class ApexChartSubtitleFactory {
  static createSubtitle(chart: Chart): object {
    const isDarkModeActive = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    return {
      text: chart.getSubtitleText(),
      floating: chart.hasFloatingSubtitle(),
      offsetY: chart.hasLargerTitle() ? 25 : 16,
      offsetX: (chart.drillDowns ?? []).length > 0 ? 25 : 0,
      style: {
        fontSize: chart.hasLargerTitle() ? '14px' : '12px',
        color: isDarkModeActive ? '#aaa' : 'rgb(150, 150, 150)'
      }
    };
  }
}
