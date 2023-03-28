import type { MeasureVisualizationType } from '../../../../../../selectedmeasure/types/MeasureVisualizationType';
import AbstractLineOrAreaChart from './AbstractLineOrAreaChart';

export default class LineChart extends AbstractLineOrAreaChart {
  override getNextMeasureVisualizationType(): MeasureVisualizationType {
    return 'line';
  }

  override shouldShowDataLabels(): boolean {
    return this.chartType === 'stepline' ? false : super.shouldShowDataLabels();
  }
}
