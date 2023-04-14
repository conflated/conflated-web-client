import FilterInputTypeFactory from './inputtype/FilterInputTypeFactory';
import type { Dimension } from '../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { FilterConfiguration } from './FilterConfiguration';
import type { Measure } from '../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { SelectedDimension } from '../../selecteddimension/SelectedDimension';
import MeasureInputFilter from './impl/input/MeasureInputFilter';
import DimensionInputFilter from './impl/input/DimensionInputFilter';
import RangeFilter from './impl/RangeFilter';
import JsonFilter from './impl/JsonFilter';
import RelativeTimeFilter from './impl/time/RelativeTimeFilter';
import DateRangeFilter from './impl/DateRangeFilter';
import TimestampRangeFilter from './impl/time/TimestampRangeFilter';
import SqlUtils from '../../../../../../../utils/SqlUtils';
import type { Filter } from './Filter';
import type { DrillDown } from '../../types/DrillDown';
import RadioButtonFilter from './impl/RadioButtonFilter';

export default class FilterFactory {
  static createDimensionSelectedFilter(dimension: Measure | Dimension): Filter {
    const selectedFilterConfiguration: FilterConfiguration = {
      aggregationFunction: 'NONE',
      allowedDimensionFilterInputTypes: FilterInputTypeFactory.createAllowedFilterInputTypes(dimension),
      chartId: '',
      dataScopeType: 'already fetched',
      filterExpression: dimension.isTimestamp ? ' Minutes' : '',
      filterInputType: FilterInputTypeFactory.createFilterInputType(dimension),
      isDrillDownFilter: false,
      isSelectionFilter: false,
      measureOrDimension: dimension,
      sqlColumn: {
        name: SqlUtils.getSqlColumnName(dimension),
        expression: SqlUtils.getSqlColumnExpression(dimension)
      },
      type: 'dimension'
    };

    return FilterFactory.createSelectedFilter(selectedFilterConfiguration);
  }

  static createMeasureSelectedFilter(measure: Measure | Dimension): Filter {
    const selectedFilterConfiguration: FilterConfiguration = {
      allowedDimensionFilterInputTypes: [],
      aggregationFunction: 'SUM',
      chartId: '',
      dataScopeType: 'already fetched',
      filterExpression: '',
      filterInputType: 'Input filter',
      isDrillDownFilter: false,
      isSelectionFilter: false,
      measureOrDimension: measure,
      sqlColumn: {
        name: SqlUtils.getSqlColumnName(measure, 'SUM'),
        expression: SqlUtils.getSqlColumnExpression(measure, 'SUM')
      },
      type: 'measure'
    };

    return FilterFactory.createSelectedFilter(selectedFilterConfiguration);
  }

  static createSelectionFilter(
    chartId: string,
    selectedDimension: SelectedDimension,
    filterExpression: string
  ): Filter {
    const allowedDimensionFilterInputTypes = FilterInputTypeFactory.createAllowedFilterInputTypes(
      selectedDimension.dimension
    );

    const selectedFilterConfiguration: FilterConfiguration = {
      allowedDimensionFilterInputTypes,
      chartId,
      filterExpression,
      aggregationFunction: 'NONE',
      dataScopeType: 'all',
      filterInputType: 'Input filter',
      isDrillDownFilter: false,
      isSelectionFilter: true,
      measureOrDimension: selectedDimension.dimension,
      sqlColumn: {
        name: SqlUtils.getSqlColumnName(selectedDimension.dimension),
        expression: SqlUtils.getSqlColumnExpression(selectedDimension.dimension)
      },
      type: 'dimension'
    };

    return FilterFactory.createSelectedFilter(selectedFilterConfiguration);
  }

  static createDrillDownFilter(drillDown: DrillDown, filterExpression: string): Filter {
    const allowedDimensionFilterInputTypes = FilterInputTypeFactory.createAllowedFilterInputTypes(
      drillDown.selectedDimension.dimension
    );

    const selectedFilterConfiguration: FilterConfiguration = {
      allowedDimensionFilterInputTypes,
      filterExpression,
      aggregationFunction: 'NONE',
      chartId: '',
      dataScopeType: 'all',
      filterInputType: 'Input filter',
      isDrillDownFilter: true,
      isSelectionFilter: false,
      measureOrDimension: drillDown.selectedDimension.dimension,
      sqlColumn: {
        name: SqlUtils.getSqlColumnName(drillDown.selectedDimension.dimension),
        expression: SqlUtils.getSqlColumnExpression(drillDown.selectedDimension.dimension)
      },
      type: 'dimension'
    };

    return FilterFactory.createSelectedFilter(selectedFilterConfiguration);
  }

  static createSelectedFilter(selectedFilterConfiguration: FilterConfiguration): Filter {
    switch (selectedFilterConfiguration.filterInputType) {
      case 'Input filter':
        return FilterFactory.createInputSelectedFilter(selectedFilterConfiguration);
      case 'Range filter':
        return new RangeFilter(selectedFilterConfiguration);
      case 'Dropdown filter':
        return new JsonFilter(selectedFilterConfiguration);
      case 'Checkboxes filter':
        return new JsonFilter(selectedFilterConfiguration);
      case 'Radio buttons filter':
        return new RadioButtonFilter(selectedFilterConfiguration);
      case 'Relative time filter':
        return new RelativeTimeFilter(selectedFilterConfiguration);
      case 'Date range filter':
        return new DateRangeFilter(selectedFilterConfiguration);
      case 'Timestamp range filter':
        return new TimestampRangeFilter(selectedFilterConfiguration);
      default:
        throw new Error('Unsupported filter input type');
    }
  }

  static createInputSelectedFilter(selectedFilterConfiguration: FilterConfiguration): Filter {
    if (
      selectedFilterConfiguration.type === 'measure' ||
      (selectedFilterConfiguration.type === 'dimension' &&
        selectedFilterConfiguration.allowedDimensionFilterInputTypes.length === 1)
    ) {
      return new MeasureInputFilter(selectedFilterConfiguration);
    }

    return new DimensionInputFilter(selectedFilterConfiguration);
  }
}
