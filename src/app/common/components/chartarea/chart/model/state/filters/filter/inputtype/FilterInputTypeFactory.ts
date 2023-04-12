import type { Dimension } from '../../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { FilterInputType } from './FilterInputType';
import type { Measure } from '../../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';

export default class FilterInputTypeFactory {
  static createFilterInputType(dimension: Dimension | Measure): FilterInputType {
    if (dimension.isString) {
      return 'Input filter';
    } else if (dimension.isTimestamp) {
      return 'Relative time filter';
    } else if (dimension.isDate) {
      return 'Date range filter';
    } else {
      return 'Input filter';
    }
  }

  static createAllowedFilterInputTypes(dimension: Dimension | Measure): FilterInputType[] {
    if (dimension.isString) {
      return ['Dropdown filter', 'Input filter', 'Checkboxes filter', 'Radio buttons filter'];
    } else if (dimension.isTimestamp) {
      return ['Relative time filter', 'Timestamp range filter'];
    } else if (dimension.isDate) {
      return ['Relative time filter', 'Date range filter'];
    } else {
      return ['Input filter'];
    }
  }
}
