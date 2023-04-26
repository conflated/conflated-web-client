import type { Chart } from '../../../model/state/Chart';

export default class ApexChartDataLabelOptionsFactory {
  static createDataLabelOptions(chart: Chart): object {
    const isDarkModeActive = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    let color = isDarkModeActive ? '#f2f2f2' : '#000';
    let fontSize = '0.8rem';

    if (chart.type === 'pie' || chart.type === 'donut') {
      color = '#f2f2f2';
      fontSize = '0.9rem';
    }

    const formatter =
      chart.selectedMeasures[0]?.measure.unit === 'percent'
        ? (value: number) => `${value} %`
        : (value: number) => {
            if (chart.type === 'pie' || chart.type === 'donut') {
              return `${value.toFixed(2)} %`;
            } else {
              return Number.isInteger(value) ? value : value.toFixed(2);
            }
          };

    return {
      formatter,
      enabled: chart.shouldShowDataLabels(),
      textAnchor: 'middle',
      offsetX: chart.type === 'bar' ? 17 : 1,
      offsetY: chart.type === 'bar' ? 5 : -5,
      style: {
        fontSize,
        fontFamily: 'Arimo, sans-serif',
        fontWeight: 'normal',
        colors:
          chart.type !== 'line' && chart.type !== 'area' && chart.type !== 'radar' && chart.type !== 'heatmap'
            ? [color]
            : ['#000']
      },
      dropShadow: {
        enabled: chart.type === 'pie' || chart.type === 'donut',
        top: 1,
        left: 1,
        blur: 2,
        color: '#000',
        opacity: 0.75
      }
    };
  }
}
