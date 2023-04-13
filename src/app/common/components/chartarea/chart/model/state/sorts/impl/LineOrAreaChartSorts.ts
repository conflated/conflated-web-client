import _ from 'lodash';
import XAxisChartSorts from './XAxisChartSorts';
import type { Dimension } from '../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { SelectedDimension } from '../../selecteddimension/SelectedDimension';
import type { Sort } from '../sort/Sort';

export default class LineOrAreaChartSorts extends XAxisChartSorts {
  override getConvertSelectedSortBys(selectedDimensions: SelectedDimension[]): Sort[] {
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

  override updateSelectedSortBysWhenAddingSelectedDimension(dimension: Dimension | Measure) {
    if (this.selectedSortBys.length === 1 && this.selectedSortBys[0].defaultType === 'measure') {
      this.selectedSortBys = [];
      this.addSelectedSortBy(dimension, 'dimension', 'ASC', 'x-axis categories');
    }
  }
}