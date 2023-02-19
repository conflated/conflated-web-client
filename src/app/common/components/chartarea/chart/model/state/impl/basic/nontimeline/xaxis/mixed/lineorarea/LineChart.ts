import type { MeasureVisualizationType } from '../../../../../../selectedmeasure/types/MeasureVisualizationType';
import AbstractLineOrAreaChart from './AbstractLineOrAreaChart';

export default class LineChart extends AbstractLineOrAreaChart {
  getNextMeasureVisualizationType(): MeasureVisualizationType {
    return 'line';
  }
}
