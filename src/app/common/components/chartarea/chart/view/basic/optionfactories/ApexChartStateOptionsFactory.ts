export default class ApexChartStateOptionsFactory {
  static createStateOptions(): object {
    return {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.1
        }
      },
      active: {
        allowMultipleDataPointsSelection: true,
        filter: {
          type: 'darken',
          value: 0
        }
      }
    };
  }
}
