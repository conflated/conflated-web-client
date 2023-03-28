import type { Chart } from '../../../model/state/Chart';

export default class ApexChartDataLabelOptionsFactory {
  static createDataLabelOptions(chart: Chart): object {
    return {
      enabled: chart.shouldShowDataLabels(),
      textAnchor: 'middle',
      offsetX: 1,
      offsetY: -5,
      style: {
        fontSize: '0.7rem',
        fontFamily: 'Arimo, sans-serif',
        fontWeight: 'normal',
        colors:
          chart.chartType !== 'line' && chart.chartType !== 'area' && chart.chartType !== 'radar' ? ['#fff'] : ['#000']
      }
    };
  }
}
