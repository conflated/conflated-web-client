import type { Chart } from '../../../model/state/Chart';

export default class ApexChartStrokeOptionsFactory {
  static createStrokeOptions(chart: Chart): object {
    return {
      show: chart.shouldShowStroke(),
      curve: chart.type === 'stepline' ? 'stepline' : 'straight',
      width: chart.getStrokeWidth(),
      colors: chart.type === 'boxPlot' ? ['#c0c0c0'] : undefined
    };
  }
}
