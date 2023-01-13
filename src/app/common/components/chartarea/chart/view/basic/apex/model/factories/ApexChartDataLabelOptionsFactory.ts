import type { Chart } from '../../../../../model/state/Chart';

export default class ApexChartDataLabelOptionsFactory {
  static createDataLabelOptions(chart: Chart): object {
    return {
      enabled: chart.shouldShowDataLabels(),
      textAnchor: 'middle',
      offsetX: 1,
      offsetY: 0,
      style: {
        fontSize: '10.5px',
        fontFamily: 'Arimo, sans-serif'
      },
      dropShadow: {
        enabled: chart.shouldShowDataLabelsDropShadow(),
        top: 3,
        left: 3,
        blur: 4,
        opacity: 0.95
      }
    };
  }
}
