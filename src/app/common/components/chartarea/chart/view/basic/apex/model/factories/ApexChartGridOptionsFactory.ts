import type { Chart } from '../../../../../model/state/Chart';

export default class ApexChartGridOptionsFactory {
  static createGridOptions(chart: Chart): object {
    return {
      show: chart.shouldShowGrid(),
      borderColor: '#c2c2c2'
    };
  }
}
