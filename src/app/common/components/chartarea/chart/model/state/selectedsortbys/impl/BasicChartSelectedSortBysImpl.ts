import _ from 'lodash';
import SelectedSortBysImpl from './SelectedSortBysImpl';
import type { SelectedDimension } from '../../selecteddimension/SelectedDimension';
import type { SelectedMeasure } from '../../selectedmeasure/SelectedMeasure';

export default abstract class BasicChartSelectedSortBysImpl extends SelectedSortBysImpl {
  updateSelectedSortBysWhenRemovingSelectedDimension(
    selectedDimension: SelectedDimension,
    selectedMeasures: SelectedMeasure[]
  ) {
    const legendDefaultSortBy = this.getDefaultOfType('legend');

    if (legendDefaultSortBy && selectedDimension.visualizationType === 'Legend') {
      this.removeSelectedSortBy(legendDefaultSortBy);
    } else if (
      selectedDimension.visualizationType === 'Legend' &&
      this.selectedSortBys.length === 1 &&
      this.selectedSortBys[0].defaultType === 'measure over legend' &&
      selectedMeasures.length === 1
    ) {
      this.selectedSortBys = [];
      this.addSelectedSortBy(
        selectedMeasures[0].measure,
        'measure',
        'DESC',
        'measure',
        selectedMeasures[0].aggregationFunction
      );
    }
  }

  updateSelectedSortBysWhenRemovingSelectedMeasure(
    selectedMeasure: SelectedMeasure,
    selectedMeasures: SelectedMeasure[]
  ) {
    if (this.selectedSortBys.length === 1 && this.selectedSortBys[0].defaultType === 'measure') {
      if (selectedMeasures.length === 1) {
        this.selectedSortBys = [];
      } else if (selectedMeasures.length === 2) {
        const remainingSelectedMeasure = _.head(_.without(selectedMeasures, selectedMeasure));

        if (remainingSelectedMeasure) {
          this.addSelectedSortBy(
            remainingSelectedMeasure.measure,
            'measure',
            'DESC',
            'measure',
            remainingSelectedMeasure.aggregationFunction
          );
        }
      } else if (selectedMeasures.length > 2) {
        const remainingSelectedMeasures = _.without(selectedMeasures, selectedMeasure);
        this.addSelectedSortByAverageOfMeasures(remainingSelectedMeasures);
      }
    }
  }
}
