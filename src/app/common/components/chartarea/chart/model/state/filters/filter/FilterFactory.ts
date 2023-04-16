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
import { FilterInputType } from './inputtype/FilterInputType';

export default class FilterFactory {
  static createDimensionFilter(dimension: Measure | Dimension, filterInputType?: FilterInputType): Filter {
    const filterConfiguration: FilterConfiguration = {
      aggregationFunction: 'NONE',
      allowedDimensionFilterInputTypes: FilterInputTypeFactory.createAllowedFilterInputTypes(dimension),
      chartId: '',
      dataScopeType: 'already fetched',
      filterExpression: dimension.isTimestamp ? ' Minutes' : '',
      filterInputType: filterInputType ?? FilterInputTypeFactory.createFilterInputType(dimension),
      isDrillDownFilter: false,
      isSelectionFilter: false,
      measureOrDimension: dimension,
      sqlColumn: {
        name: SqlUtils.getSqlColumnName(dimension),
        expression: SqlUtils.getSqlColumnExpression(dimension)
      },
      type: 'dimension'
    };

    return FilterFactory.createFilter(filterConfiguration);
  }

  static createMeasureFilter(measure: Measure | Dimension, filterInputType?: FilterInputType): Filter {
    const filterConfiguration: FilterConfiguration = {
      allowedDimensionFilterInputTypes: [],
      aggregationFunction: 'SUM',
      chartId: '',
      dataScopeType: 'already fetched',
      filterExpression: '',
      filterInputType: filterInputType ?? 'Input filter',
      isDrillDownFilter: false,
      isSelectionFilter: false,
      measureOrDimension: measure,
      sqlColumn: {
        name: SqlUtils.getSqlColumnName(measure, 'SUM'),
        expression: SqlUtils.getSqlColumnExpression(measure, 'SUM')
      },
      type: 'measure'
    };

    return FilterFactory.createFilter(filterConfiguration);
  }

  static createSelectionFilter(
    chartId: string,
    selectedDimension: SelectedDimension,
    filterExpression: string
  ): Filter {
    const allowedDimensionFilterInputTypes = FilterInputTypeFactory.createAllowedFilterInputTypes(
      selectedDimension.dimension
    );

    const filterConfiguration: FilterConfiguration = {
      allowedDimensionFilterInputTypes,
      chartId,
      filterExpression,
      aggregationFunction: 'NONE',
      dataScopeType: 'already fetched',
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

    return FilterFactory.createFilter(filterConfiguration);
  }

  static createDrillDownFilter(drillDown: DrillDown, filterExpression: string): Filter {
    const allowedDimensionFilterInputTypes = FilterInputTypeFactory.createAllowedFilterInputTypes(
      drillDown.selectedDimension.dimension
    );

    const filterConfiguration: FilterConfiguration = {
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

    return FilterFactory.createFilter(filterConfiguration);
  }

  static createFilter(filterConfiguration: FilterConfiguration): Filter {
    switch (filterConfiguration.filterInputType) {
      case 'Input filter':
      case 'Quick filter':
        return FilterFactory.createInputFilter(filterConfiguration);
      case 'Range filter':
        return new RangeFilter(filterConfiguration);
      case 'Dropdown filter':
        return new JsonFilter(filterConfiguration);
      case 'Checkboxes filter':
        return new JsonFilter(filterConfiguration);
      case 'Radio buttons filter':
        return new RadioButtonFilter(filterConfiguration);
      case 'Relative time filter':
        return new RelativeTimeFilter(filterConfiguration);
      case 'Date range filter':
        return new DateRangeFilter(filterConfiguration);
      case 'Timestamp range filter':
        return new TimestampRangeFilter(filterConfiguration);
      default:
        throw new Error('Unsupported filter input type');
    }
  }

  static createInputFilter(filterConfiguration: FilterConfiguration): Filter {
    if (
      filterConfiguration.type === 'measure' ||
      (filterConfiguration.type === 'dimension' && filterConfiguration.allowedDimensionFilterInputTypes.length === 1)
    ) {
      return new MeasureInputFilter(filterConfiguration);
    }

    return new DimensionInputFilter(filterConfiguration);
  }
}
