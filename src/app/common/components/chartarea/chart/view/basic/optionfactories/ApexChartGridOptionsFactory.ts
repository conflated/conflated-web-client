import type { Chart } from '../../../model/state/Chart';

export default class ApexChartGridOptionsFactory {
  static createGridOptions(chart: Chart): object {
    const isDarkModeActive = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    return {
      show: chart.shouldShowGrid(),
      borderColor: isDarkModeActive ? '#222' : '#f2f2f2',
      xaxis: {
        lines: {
          show: false
        }
      }
    };
  }
}
