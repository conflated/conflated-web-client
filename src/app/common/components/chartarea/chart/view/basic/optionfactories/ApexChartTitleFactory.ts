import type { Chart } from '../../../model/state/Chart';

export default class ApexChartTitleFactory {
  static createTitle(chart: Chart): object {
    const isDarkModeActive = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    return {
      text: `${chart.id}. ${chart.getTitleText()}`,
      floating: chart.hasFloatingTitle(),
      style: {
        color: isDarkModeActive ? '#FFFFFF' : '#000000',
        fontSize: chart.hasLargerTitle() ? '24px' : '14px',
        fontWeight: isDarkModeActive ? 'normal' : 'bold'
      },
      offsetX: (chart.drillDowns ?? []).length > 0 ? 25 : 0
    };
  }
}
