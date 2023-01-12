import type { Chart } from '../../../../../model/state/Chart';

export default class ApexChartTitleFactory {
  static createTitle(chart: Chart): object {
    return {
      text: chart.getTitleText(),
      floating: chart.hasFloatingTitle(),
      style: {
        fontSize: chart.hasLargerTitle() ? '26px' : '16px',
        color: 'rgb(0 0 0)'
      },
      offsetX: (chart.drillDowns ?? []).length > 0 ? 25 : 0
    };
  }
}
