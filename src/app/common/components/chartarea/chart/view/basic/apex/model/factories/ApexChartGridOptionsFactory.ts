import type { Chart } from '../../../../../model/state/Chart';

export default class ApexChartGridOptionsFactory {
  static createGridOptions(chart: Chart): object {
    const isDarkModeActive = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    return {
      show: chart.shouldShowGrid(),
      borderColor: isDarkModeActive ? '#101010' : '#c2c2c2',
      xaxis: {
        lines: {
          show: false
        }
      }
    };
  }
}
