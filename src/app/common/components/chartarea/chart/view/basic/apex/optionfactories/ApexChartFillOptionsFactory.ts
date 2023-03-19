import type { Chart } from '../../../../model/state/Chart';

export default class ApexChartFillOptionsFactory {
  static createFillOptions(chart: Chart): object {
    const gradientFillType = chart.getGradientFillType();
    const opacity = chart.getFillOpacity();

    const gradientFill = {
      type: gradientFillType,
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.95,
        opacityTo: 0.2,
        stops: [60, 100]
      }
    };

    const solidFill = {
      type: 'solid',
      opacity
    };

    return chart.getFillType() === 'gradient' ? gradientFill : solidFill;
  }
}
