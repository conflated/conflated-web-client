import type { Chart } from '../../../../../model/state/Chart';

export default class ApexChartLabelsFactory {
  static createLabels(chart: Chart): string[] | null | undefined {
    return chart.getLabels();
  }
}
