import FilterInputTypeFactory from './FilterInputTypeFactory';
import type { Dimension } from '../../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/types/Dimension';
import type { SelectedFilterConfiguration } from '../SelectedFilterConfiguration';
import type { Measure } from '../../../../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/types/Measure';
import type { SelectedDimension } from '../../../selecteddimension/SelectedDimension';
import MeasureInputSelectedFilterImpl from '../impl/inputselectedfilter/measure/MeasureInputSelectedFilterImpl';
import DimensionInputSelectedFilterImpl from '../impl/inputselectedfilter/dimension/DimensionInputSelectedFilterImpl';
import RangeSelectedFilterImpl from '../impl/rangeselectedfilter/RangeSelectedFilterImpl';
import JsonSelectedFilterImpl from '../impl/jsonselectedfilter/JsonSelectedFilterImpl';
import RelativeTimeSelectedFilterImpl from '../impl/relativetimeselectedfilter/RelativeTimeSelectedFilterImpl';
import DateRangeSelectedFilterImpl from '../impl/daterangeselectedfilter/DateRangeSelectedFilterImpl';
import TimestampRangeSelectedFilterImpl from '../impl/timestamprangeselectedfilter/TimestampRangeSelectedFilterImpl';
import SqlUtils from '../../../../../../../../utils/SqlUtils';
import type { SelectedFilter } from '../SelectedFilter';
import type { DrillDown } from '../../../types/DrillDown';

export default class SelectedFilterFactory {
  static createDimensionSelectedFilter(dimension: Measure | Dimension): SelectedFilter {
    const selectedFilterConfiguration: SelectedFilterConfiguration = {
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

    return SelectedFilterFactory.createSelectedFilter(selectedFilterConfiguration);
  }

  static createMeasureSelectedFilter(measure: Measure | Dimension): SelectedFilter {
    const selectedFilterConfiguration: SelectedFilterConfiguration = {
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

    return SelectedFilterFactory.createSelectedFilter(selectedFilterConfiguration);
  }

  static createSelectionFilter(
    chartId: string,
    selectedDimension: SelectedDimension,
    filterExpression: string
  ): SelectedFilter {
    const allowedDimensionFilterInputTypes = FilterInputTypeFactory.createAllowedFilterInputTypes(
      selectedDimension.dimension
    );

    const selectedFilterConfiguration: SelectedFilterConfiguration = {
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

    return SelectedFilterFactory.createSelectedFilter(selectedFilterConfiguration);
  }

  static createDrillDownFilter(drillDown: DrillDown, filterExpression: string): SelectedFilter {
    const allowedDimensionFilterInputTypes = FilterInputTypeFactory.createAllowedFilterInputTypes(
      drillDown.selectedDimension.dimension
    );

    const selectedFilterConfiguration: SelectedFilterConfiguration = {
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

    return SelectedFilterFactory.createSelectedFilter(selectedFilterConfiguration);
  }

  static createSelectedFilter(selectedFilterConfiguration: SelectedFilterConfiguration): SelectedFilter {
    switch (selectedFilterConfiguration.filterInputType) {
      case 'Input filter':
        return SelectedFilterFactory.createInputSelectedFilter(selectedFilterConfiguration);
      case 'Range filter':
        return new RangeSelectedFilterImpl(selectedFilterConfiguration);
      case 'Dropdown filter':
        return new JsonSelectedFilterImpl(selectedFilterConfiguration);
      case 'Checkboxes filter':
        return new JsonSelectedFilterImpl(selectedFilterConfiguration);
      case 'Radio buttons filter':
        return new JsonSelectedFilterImpl(selectedFilterConfiguration);
      case 'Relative time filter':
        return new RelativeTimeSelectedFilterImpl(selectedFilterConfiguration);
      case 'Date range filter':
        return new DateRangeSelectedFilterImpl(selectedFilterConfiguration);
      case 'Timestamp range filter':
        return new TimestampRangeSelectedFilterImpl(selectedFilterConfiguration);
      default:
        throw new Error('Unsupported filter input type');
    }
  }

  static createInputSelectedFilter(selectedFilterConfiguration: SelectedFilterConfiguration): SelectedFilter {
    if (
      selectedFilterConfiguration.type === 'measure' ||
      (selectedFilterConfiguration.type === 'dimension' &&
        selectedFilterConfiguration.allowedDimensionFilterInputTypes.length === 1)
    ) {
      return new MeasureInputSelectedFilterImpl(selectedFilterConfiguration);
    }

    return new DimensionInputSelectedFilterImpl(selectedFilterConfiguration);
  }
}
