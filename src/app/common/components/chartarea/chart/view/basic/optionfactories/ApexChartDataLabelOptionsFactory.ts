import type { Chart } from '../../../model/state/Chart';

export default class ApexChartDataLabelOptionsFactory {
  static createDataLabelOptions(chart: Chart): object {
    const isDarkModeActive = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const color = isDarkModeActive ? '#f2f2f2' : '#000';

    const formatter =
      chart.selectedMeasures[0]?.measure.unit === 'percent'
        ? (value: number) => `${value} %`
        : (value: number) => value;

    return {
      formatter,
      enabled: chart.shouldShowDataLabels(),
      textAnchor: 'middle',
      offsetX: 1,
      offsetY: -5,
      style: {
        fontSize: '0.8rem',
        fontFamily: 'Arimo, sans-serif',
        fontWeight: 'normal',
        colors:
          chart.type !== 'line' && chart.type !== 'area' && chart.type !== 'radar' && chart.type !== 'heatmap'
            ? [color]
            : ['#000']
      }
    };
  }
}
