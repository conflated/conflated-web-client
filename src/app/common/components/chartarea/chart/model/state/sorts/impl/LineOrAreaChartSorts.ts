import _ from 'lodash';
import XAxisChartSorts from './XAxisChartSorts';
import type { Dimension } from '../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { SelectedDimension } from '../../selecteddimension/SelectedDimension';
import type { Sort } from '../sort/Sort';

export default class LineOrAreaChartSorts extends XAxisChartSorts {
  override getConvertedSorts(selectedDimensions: SelectedDimension[]): Sort[] {
    if (
      this.sorts.length >= 1 &&
      this.sorts[0].defaultType === 'measure' &&
      selectedDimensions.length >= 1 &&
      selectedDimensions[0].dimension.isTimestamp
    ) {
      return [
        ..._.tail(this.sorts),
        {
          measureOrDimension: selectedDimensions[0].dimension,
          sqlColumn: selectedDimensions[0].sqlColumn,
          aggregationFunction: 'NONE',
          timeSortOption: 'none',
          type: 'dimension',
          direction: 'ASC',
          dataScope: 'already fetched',
          defaultType: 'x-axis categories'
        }
      ];
    }

    return this.sorts;
  }

  override updateSortsWhenAddingSelectedDimension(dimension: Dimension | Measure) {
    if (this.sorts.length === 1 && this.sorts[0].defaultType === 'measure') {
      this.sorts = [];
      this.addSort(dimension, 'dimension', 'ASC', 'x-axis categories');
    }
  }
}
