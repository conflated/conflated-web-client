import type { MeasureVisualizationType } from '../../../../../../../selectedmeasure/types/MeasureVisualizationType';
import LineOrAreaChartImpl from '../LineOrAreaChartImpl';

export default class LineChartImpl extends LineOrAreaChartImpl {
  getNextMeasureVisualizationType(): MeasureVisualizationType {
    return 'line';
  }
}
