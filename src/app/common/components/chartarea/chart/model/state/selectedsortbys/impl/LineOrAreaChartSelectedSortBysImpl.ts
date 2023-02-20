import _ from 'lodash';
import XAxisChartSelectedSortBysImpl from './XAxisChartSelectedSortBysImpl';
import type { Dimension } from '../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/types/Dimension';
import type { Measure } from '../../../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/types/Measure';
import type { SelectedDimension } from '../../selecteddimension/SelectedDimension';
import type { SelectedSortBy } from '../selectedsortby/SelectedSortBy';

export default class LineOrAreaChartSelectedSortBysImpl extends XAxisChartSelectedSortBysImpl {
  getConvertSelectedSortBys(selectedDimensions: SelectedDimension[]): SelectedSortBy[] {
    if (
      this.selectedSortBys.length >= 1 &&
      this.selectedSortBys[0].defaultType === 'measure' &&
      selectedDimensions.length >= 1 &&
      selectedDimensions[0].dimension.isTimestamp
    ) {
      return [
        ..._.tail(this.selectedSortBys),
        {
          measureOrDimension: selectedDimensions[0].dimension,
          sqlColumn: selectedDimensions[0].sqlColumn,
          aggregationFunction: 'NONE',
          timeSortOption: 'none',
          type: 'dimension',
          sortDirection: 'ASC',
          dataScopeType: 'already fetched',
          defaultType: 'x-axis categories'
        }
      ];
    }

    return this.selectedSortBys;
  }

  updateSelectedSortBysWhenAddingSelectedDimension(dimension: Dimension | Measure) {
    if (this.selectedSortBys.length === 1 && this.selectedSortBys[0].defaultType === 'measure') {
      this.selectedSortBys = [];
      this.addSelectedSortBy(dimension, 'dimension', 'ASC', 'x-axis categories');
    }
  }
}
