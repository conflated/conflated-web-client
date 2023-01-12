import type { FillType } from '../../../../../../../types/FillType';
import LineOrAreaChartImpl from '../LineOrAreaChartImpl';
import type { MeasureVisualizationType } from '../../../../../../../selectedmeasure/types/MeasureVisualizationType';

export default class AreaChartImpl extends LineOrAreaChartImpl {
  getNextMeasureVisualizationType(): MeasureVisualizationType {
    return 'area';
  }

  getFillType(): FillType {
    return 'gradient';
  }
}
