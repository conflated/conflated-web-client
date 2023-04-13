import { Sort } from './sort/Sort';
import { Chart } from '../Chart';
import AbstractXAxisCategoriesChart from '../impl/basic/nontimeline/xaxiscategories/AbstractXAxisCategoriesChart';
import XAxisChartSorts from './impl/XAxisChartSorts';
import ChartSortsImpl from './impl/ChartSortsImpl';
import AbstractLineOrAreaChart from '../impl/basic/nontimeline/xaxiscategories/mixed/lineorarea/AbstractLineOrAreaChart';
import LineOrAreaChartSorts from './impl/LineOrAreaChartSorts';
import AbstractNonTimelineChart from '../impl/basic/nontimeline/AbstractNonTimelineChart';
import NonTimelineChartSorts from './impl/NonTimelineChartSorts';
import AbstractTimelineChart from '../impl/basic/timeline/AbstractTimelineChart';
import TimelineChartSorts from './impl/TimelineChartSorts';

export default class ChartSortsFactory {
  static createChartSorts(chart: Chart, sorts: Sort[]) {
    if (chart instanceof AbstractXAxisCategoriesChart) {
      return new XAxisChartSorts(sorts);
    } else if (chart instanceof AbstractLineOrAreaChart) {
      return new LineOrAreaChartSorts(sorts);
    } else if (chart instanceof AbstractNonTimelineChart) {
      return new NonTimelineChartSorts(sorts);
    } else if (chart instanceof AbstractTimelineChart) {
      return new TimelineChartSorts(sorts);
    } else {
      return new ChartSortsImpl(sorts);
    }
  }
}
