import type { Chart } from '../../../model/state/Chart';

export default class ApexChartStrokeOptionsFactory {
  static createStrokeOptions(chart: Chart): object {
    const isDarkModeActive = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return {
      show: chart.shouldShowStroke(),
      curve: chart.type === 'stepline' ? 'stepline' : 'straight',
      width: chart.getStrokeWidth(),
      colors: chart.type === 'boxPlot' && isDarkModeActive ? ['#c0c0c0'] : undefined
    };
  }
}
