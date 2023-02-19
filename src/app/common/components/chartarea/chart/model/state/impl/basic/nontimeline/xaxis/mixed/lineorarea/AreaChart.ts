import type { FillType } from '../../../../../../types/FillType';
import AbstractLineOrAreaChart from './AbstractLineOrAreaChart';
import type { MeasureVisualizationType } from '../../../../../../selectedmeasure/types/MeasureVisualizationType';

export default class AreaChart extends AbstractLineOrAreaChart {
  getNextMeasureVisualizationType(): MeasureVisualizationType {
    return 'area';
  }

  getFillType(): FillType {
    return 'gradient';
  }
}
