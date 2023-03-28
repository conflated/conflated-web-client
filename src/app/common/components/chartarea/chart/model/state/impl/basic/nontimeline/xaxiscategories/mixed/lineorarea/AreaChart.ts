import type { FillType } from '../../../../../../types/FillType';
import AbstractLineOrAreaChart from './AbstractLineOrAreaChart';
import type { MeasureVisualizationType } from '../../../../../../selectedmeasure/types/MeasureVisualizationType';

export default class AreaChart extends AbstractLineOrAreaChart {
  override getNextMeasureVisualizationType(): MeasureVisualizationType {
    return 'area';
  }

  override getFillType(): FillType {
    const darkModeIsActive = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return darkModeIsActive ? 'solid' : 'gradient';
  }
}
