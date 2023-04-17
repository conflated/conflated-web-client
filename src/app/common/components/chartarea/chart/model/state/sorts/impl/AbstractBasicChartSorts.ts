import _ from 'lodash';
import ChartSortsImpl from './ChartSortsImpl';
import type { SelectedDimension } from '../../selecteddimension/SelectedDimension';
import type { SelectedMeasure } from '../../selectedmeasure/SelectedMeasure';

export default abstract class AbstractBasicChartSorts extends ChartSortsImpl {
  override updateSortsWhenRemovingSelectedDimension(
    selectedDimension: SelectedDimension,
    selectedMeasures: SelectedMeasure[]
  ) {
    const legendDefaultSortBy = this.getDefaultSortOfType('legend');

    if (legendDefaultSortBy && selectedDimension.visualizationType === 'Legend') {
      this.removeSort(legendDefaultSortBy);
    } else if (
      selectedDimension.visualizationType === 'Legend' &&
      this.sorts.length === 1 &&
      this.sorts[0].defaultType === 'measure over legend' &&
      selectedMeasures.length === 1
    ) {
      this.sorts = [];
      this.addSort(selectedMeasures[0].measure, 'measure', 'DESC', 'measure', selectedMeasures[0].aggregationFunction);
    }
  }

  override updateSortsWhenRemovingSelectedMeasure(
    selectedMeasure: SelectedMeasure,
    selectedMeasures: SelectedMeasure[]
  ) {
    if (this.sorts.length === 1 && this.sorts[0].defaultType === 'measure') {
      if (selectedMeasures.length === 1) {
        this.sorts = [];
      } else if (selectedMeasures.length === 2) {
        const remainingSelectedMeasure = _.head(_.without(selectedMeasures, selectedMeasure));

        if (remainingSelectedMeasure) {
          this.addSort(
            remainingSelectedMeasure.measure,
            'measure',
            'DESC',
            'measure',
            remainingSelectedMeasure.aggregationFunction
          );
        }
      } else if (selectedMeasures.length > 2) {
        const remainingSelectedMeasures = _.without(selectedMeasures, selectedMeasure);
        this.addSortByAverageOfMeasures(remainingSelectedMeasures);
      }
    }
  }
}
