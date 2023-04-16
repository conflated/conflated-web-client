import type { Chart } from '../../../model/state/Chart';
import { ChartAreaStateNamespace } from '../../../../model/state/types/ChartAreaStateNamespace';

export default class ApexChartTitleFactory {
  static createTitle(chart: Chart, stateNamespace: ChartAreaStateNamespace): object {
    const isDarkModeActive = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    return {
      text:
        stateNamespace === 'dataExplorerPage' && chart.chartType !== 'sparkline'
          ? `${chart.id}. ${chart.getTitleText(stateNamespace)}`
          : chart.getTitleText(stateNamespace),
      floating: chart.hasFloatingTitle(),
      style: {
        color: isDarkModeActive ? '#FFFFFF' : '#000000',
        fontSize: chart.hasLargerTitle() ? '24px' : '14px',
        fontWeight: isDarkModeActive ? 'normal' : 'bold'
      },
      offsetX: (chart.drillDowns ?? []).length > 0 ? 25 : 0
    };
  }
}
