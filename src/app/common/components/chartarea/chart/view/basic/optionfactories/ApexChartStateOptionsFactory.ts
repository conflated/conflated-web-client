export default class ApexChartStateOptionsFactory {
  static createStateOptions(): object {
    return {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.3
        }
      },
      active: {
        allowMultipleDataPointsSelection: true,
        filter: {
          type: 'lighten',
          value: 0.3
        }
      }
    };
  }
}
