import type { FillType } from '../../../../../../types/FillType';
import AbstractLineOrAreaChart from './AbstractLineOrAreaChart';
import type { MeasureVisualizationType } from '../../../../../../selectedmeasure/types/MeasureVisualizationType';
import MeasureDropZoneListItemViewFactory from '../../../../../../../../../../../../page/dataexplorer/pane/left/selector/measure/view/MeasureDropZoneListItemViewFactory';

export default class AreaChart extends AbstractLineOrAreaChart {
  override getNextMeasureVisualizationType(): MeasureVisualizationType {
    return 'area';
  }

  override getFillType(): FillType {
    const darkModeIsActive = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return darkModeIsActive ? 'solid' : 'gradient';
  }

  override getMeasureDropZoneListItemViews(
    measureDropZoneListItemViewFactory: MeasureDropZoneListItemViewFactory
  ): Array<JSX.Element> {
    if (
      this.selectedMeasures.length > 0 &&
      this.hasSelectedDimensionOfType('X-axis categories') &&
      this.hasSelectedDimensionOfType('Legend')
    ) {
      return [];
    } else {
      return [measureDropZoneListItemViewFactory.createMeasureDropZoneListItem('1', 'area', 'area')];
    }
  }
}
