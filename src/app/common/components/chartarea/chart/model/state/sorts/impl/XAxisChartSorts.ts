import AbstractBasicChartSorts from './AbstractBasicChartSorts';
import type { Dimension } from '../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { DimensionVisualizationType } from '../../selecteddimension/DimensionVisualizationType';
import type { Measure } from '../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Chart } from '../../Chart';
import type { SelectedDimension } from '../../selecteddimension/SelectedDimension';

export default class XAxisChartSorts extends AbstractBasicChartSorts {
  override updateSortsWhenAddingSelectedDimension(
    dimension: Dimension | Measure,
    visualizationType: DimensionVisualizationType,
    chart: Chart
  ) {
    const xAxisCategoriesSelectedDimension = chart.getSelectedDimensionOfType('X-axis categories');

    if (this.sorts.length === 0 && visualizationType === 'X-axis categories') {
      this.addSort(dimension, 'dimension', 'ASC', 'x-axis categories');
    } else if (this.sorts.length === 1 && xAxisCategoriesSelectedDimension != null && visualizationType === 'Legend') {
      if (this.sorts[0].defaultType === 'x-axis categories') {
        this.addSort(dimension, 'dimension', 'ASC', 'legend');
      } else if (this.sorts[0].defaultType === 'measure') {
        this.sorts = [];

        if (chart.hasTimestampXAxis()) {
          this.addSortByTime(dimension, 'Latest value', 'DESC');
        } else {
          this.addSortByMeasureOverLegendPartitionedByXAxisCategories(dimension, xAxisCategoriesSelectedDimension);
        }
      }
    }
  }

  override updateSortsWhenRemovingSelectedDimension(selectedDimension: SelectedDimension) {
    if (this.getDefaultSortOfType('x-axis categories') && selectedDimension.visualizationType === 'X-axis categories') {
      this.sorts = [];
    }
  }

  override updateSortsWhenAddingSelectedMeasure(measure: Measure | Dimension): void {
    const sortDirection = 'DESC';

    if (this.sorts.length === 0) {
      this.addSort(measure, 'measure', sortDirection, 'measure', measure.unit === 'percent' ? 'AVG' : 'SUM');
    }
  }
}
