import AbstractBasicChartSorts from './AbstractBasicChartSorts';
import type { Dimension } from '../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { DimensionVisualizationType } from '../../selecteddimension/DimensionVisualizationType';
import type { Measure } from '../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Chart } from '../../Chart';
import type { SelectedDimension } from '../../selecteddimension/SelectedDimension';

export default class XAxisChartSorts extends AbstractBasicChartSorts {
  override updateSelectedSortBysWhenAddingSelectedDimension(
    dimension: Dimension | Measure,
    visualizationType: DimensionVisualizationType,
    chart: Chart
  ) {
    const xAxisCategoriesSelectedDimension = chart.getSelectedDimensionOfType('X-axis categories');

    if (this.selectedSortBys.length === 0 && visualizationType === 'X-axis categories') {
      this.addSelectedSortBy(dimension, 'dimension', 'ASC', 'x-axis categories');
    } else if (
      this.selectedSortBys.length === 1 &&
      xAxisCategoriesSelectedDimension != null &&
      visualizationType === 'Legend'
    ) {
      if (this.selectedSortBys[0].defaultType === 'x-axis categories') {
        this.addSelectedSortBy(dimension, 'dimension', 'ASC', 'legend');
      } else if (this.selectedSortBys[0].defaultType === 'measure') {
        this.selectedSortBys = [];

        if (chart.hasTimestampXAxis()) {
          this.addSelectedSortByTime(dimension, 'Latest value', 'DESC');
        } else {
          this.addSelectedSortByMeasureOverLegendPartitionedByXAxisCategories(
            dimension,
            xAxisCategoriesSelectedDimension
          );
        }
      }
    }
  }

  override updateSelectedSortBysWhenRemovingSelectedDimension(selectedDimension: SelectedDimension) {
    if (this.getDefaultOfType('x-axis categories') && selectedDimension.visualizationType === 'X-axis categories') {
      this.selectedSortBys = [];
    }
  }

  override updateSelectedSortBysWhenAddingSelectedMeasure(measure: Measure | Dimension): void {
    const sortDirection =
      measure.name.toLowerCase().includes('error') ||
      measure.name.toLowerCase().includes('fail') ||
      measure.name.toLowerCase().includes('fault')
        ? 'DESC'
        : 'ASC';

    if (this.selectedSortBys.length === 0) {
      this.addSelectedSortBy(measure, 'measure', sortDirection, 'measure');
    }
  }
}