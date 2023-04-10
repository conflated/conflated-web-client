import type { Chart } from '../../../model/state/Chart';

export default class ApexChartDataLabelOptionsFactory {
  static createDataLabelOptions(chart: Chart): object {
    const isDarkModeActive = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const color = isDarkModeActive ? '#f2f2f2' : '#000';

    return {
      enabled: chart.shouldShowDataLabels(),
      formatter: (value: number) => `${value} %`,
      textAnchor: 'middle',
      offsetX: 1,
      offsetY: chart.chartType === 'bar' ? 5 : -5,
      style: {
        fontSize: '0.8rem',
        fontFamily: 'Arimo, sans-serif',
        fontWeight: 'normal',
        colors:
          chart.chartType !== 'line' &&
          chart.chartType !== 'area' &&
          chart.chartType !== 'radar' &&
          chart.chartType !== 'heatmap'
            ? [color]
            : ['#000']
      }
    };
  }
}
