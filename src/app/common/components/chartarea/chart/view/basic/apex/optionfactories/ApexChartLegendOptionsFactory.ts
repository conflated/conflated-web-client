/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Chart } from '../../../../model/state/Chart';

export default class ApexChartLegendOptionsFactory {
  static createLegendOptions(chart: Chart): object {
    const isPieOrDonutChartWithMultipleSelectedMeasuresOnly = chart.isPieOrDonutWithMultipleMeasuresOnly();
    const [shouldShowLegend, legendPosition] = chart.shouldShowLegend();

    return {
      show: shouldShowLegend,
      position: legendPosition,
      fontSize: isPieOrDonutChartWithMultipleSelectedMeasuresOnly ? '16px' : '12px',
      labels: {
        useSeriesColors: isPieOrDonutChartWithMultipleSelectedMeasuresOnly
      },
      formatter: isPieOrDonutChartWithMultipleSelectedMeasuresOnly
        ? (seriesName: string, opts: any) => `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}`
        : undefined
    };
  }
}
