import type { Chart } from '../../../model/state/Chart';

export default class ApexChartXAxisOptionsFactory {
  static createXAxisOptions(chart: Chart): object {
    return chart.getApexXAxisOptions();
  }
}
