import type { Chart } from '../../../../../model/state/Chart';

export default class ApexChartGeneralOptionsFactory {
  static createGeneralOptions(chart: Chart): object {
    const zoomType = 'xy';
    const isDarkModeActive = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    return {
      id: chart.id,
      animations: {
        enabled: false
      },
      zoom: {
        enabled: chart.isZoomable(),
        type: zoomType
      },
      foreColor: isDarkModeActive ? '#FFFFFF' : '#111111',
      fontFamily: 'Arimo; sans-serif',
      sparkline: {
        enabled: chart.shouldShowAsSparkline()
      }
    };
  }
}
