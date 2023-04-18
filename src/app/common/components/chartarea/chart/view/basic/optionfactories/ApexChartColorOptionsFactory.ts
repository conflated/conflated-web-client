import type { Chart } from '../../../model/state/Chart';

export default class ApexChartColorOptionsFactory {
  static createColorOptions(chart: Chart) {
    return chart.getColors();
  }
}
