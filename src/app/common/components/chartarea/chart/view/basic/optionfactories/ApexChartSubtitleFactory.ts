import type { Chart } from '../../../model/state/Chart';

export default class ApexChartSubtitleFactory {
  static createSubtitle(chart: Chart): object {
    const isDarkModeActive = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    return {
      text: chart.getSubtitleText(),
      floating: chart.hasFloatingSubtitle(),
      offsetY: chart.hasLargerTitle() ? 26 : 17,
      offsetX: (chart.drillDowns ?? []).length > 0 ? 25 : 0,
      style: {
        fontSize: chart.hasLargerTitle() ? '15px' : '13px',
        color: isDarkModeActive ? '#a9a9a9' : 'rgb(150, 150, 150)'
      }
    };
  }
}
