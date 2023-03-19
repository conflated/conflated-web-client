import type { Chart } from '../../../../model/state/Chart';

export default class ApexChartFillOptionsFactory {
  static createFillOptions(chart: Chart): object {
    const gradientFillType = chart.getGradientFillType();
    const opacity = chart.getFillOpacity();

    const gradientFill = {
      type: gradientFillType,
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.2,
        inverseColors: false,
        gradientToColors: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
        opacityFrom: 1,
        opacityTo: 0.7,
        stops: [0, 100]
      },
      opacity
    };

    const solidFill = {
      type: 'solid',
      opacity
    };

    return chart.getFillType() === 'gradient' ? gradientFill : solidFill;
  }
}
