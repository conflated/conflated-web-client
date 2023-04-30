import type { MeasureVisualizationType } from '../../../../../../selectedmeasure/types/MeasureVisualizationType';
import AbstractLineOrAreaChart from './AbstractLineOrAreaChart';
import MeasureDropZoneListItemViewFactory from '../../../../../../../../../../../../page/dataexplorer/pane/left/selector/measure/view/MeasureDropZoneListItemViewFactory';

export default class LineChart extends AbstractLineOrAreaChart {
  override getNextMeasureVisualizationType(): MeasureVisualizationType {
    return 'line';
  }

  override shouldShowDataLabels(): boolean {
    return this.type === 'stepline' ? false : super.shouldShowDataLabels();
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
      return [measureDropZoneListItemViewFactory.createMeasureDropZoneListItem('1', 'line', 'line')];
    }
  }
}
