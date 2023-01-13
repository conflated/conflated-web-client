export default class ChartJsChartBaseOptionsFactory {
  static createBaseOptions(): object {
    return {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'bottom'
      },
      title: {
        display: false
      },
      layout: {
        padding: {
          top: 55
        }
      }
    };
  }
}
