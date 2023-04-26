import type { Chart } from '../../../model/state/Chart';

export default class ApexChartGridOptionsFactory {
  static createGridOptions(chart: Chart): object {
    const isDarkModeActive = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const borderColor = isDarkModeActive ? '#222' : '#e9e9e9';

    return {
      borderColor,
      show: chart.shouldShowGrid(),
      xaxis: {
        lines: {
          show: false
        }
      }
    };
  }
}
