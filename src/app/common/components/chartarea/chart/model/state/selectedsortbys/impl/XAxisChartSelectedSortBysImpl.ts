import BasicChartSelectedSortBysImpl from './BasicChartSelectedSortBysImpl';
import type { Dimension } from '../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/types/Dimension';
import type { DimensionVisualizationType } from '../../selecteddimension/types/DimensionVisualizationType';
import type { Measure } from '../../../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/types/Measure';
import type { Chart } from '../../Chart';
import type { SelectedDimension } from '../../selecteddimension/SelectedDimension';

export default class XAxisChartSelectedSortBysImpl extends BasicChartSelectedSortBysImpl {
  updateSelectedSortBysWhenAddingSelectedDimension(
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

  updateSelectedSortBysWhenRemovingSelectedDimension(selectedDimension: SelectedDimension) {
    if (this.getDefaultOfType('x-axis categories') && selectedDimension.visualizationType === 'X-axis categories') {
      this.selectedSortBys = [];
    }
  }

  updateSelectedSortBysWhenAddingSelectedMeasure(): void {
    // Intentionally no operation
  }
}
