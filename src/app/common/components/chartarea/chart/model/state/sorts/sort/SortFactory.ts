import type { DataScopeType } from '../../types/DataScopeType';
import type { Sort } from './Sort';
import type { Measure } from '../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { SortDirection } from './types/SortDirection';
import type { TimeSortOption } from './types/TimeSortOption';
import type { Dimension } from '../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { SelectedMeasure } from '../../selectedmeasure/SelectedMeasure';
import type { SelectedDimension } from '../../selecteddimension/SelectedDimension';
import type { SelectedSortByType } from './types/SortType';
import type { DefaultSortType } from './types/DefaultSortType';
import SqlUtils from '../../../../../../../utils/SqlUtils';
import type { AggregationFunction } from '../../selectedmeasure/types/AggregationFunction';

export default class SortFactory {
  static createSelectedSortBy(
    measureOrDimension: Measure | Dimension,
    type: SelectedSortByType,
    sortDirection: SortDirection,
    dataScopeType: DataScopeType,
    defaultType: DefaultSortType,
    aggregationFunction: AggregationFunction = 'SUM'
  ): Sort {
    if (type === 'measure') {
      return {
        dataScopeType,
        sortDirection,
        measureOrDimension,
        aggregationFunction,
        sqlColumn: {
          name: SqlUtils.getSqlColumnName(measureOrDimension, aggregationFunction),
          expression: SqlUtils.getSqlColumnExpression(measureOrDimension, aggregationFunction)
        },
        timeSortOption: 'none',
        type: 'measure',
        defaultType: 'none'
      };
    } else {
      return {
        measureOrDimension,
        dataScopeType,
        defaultType,
        sortDirection,
        sqlColumn: {
          name: SqlUtils.getSqlColumnName(measureOrDimension),
          expression: SqlUtils.getSqlColumnExpression(measureOrDimension)
        },
        aggregationFunction: 'NONE',
        timeSortOption: 'none',
        type: 'dimension'
      };
    }
  }

  static createSelectedSortByAverageOfMeasures(selectedMeasures: SelectedMeasure[]): Sort {
    return {
      measureOrDimension: {
        name: 'Avg of measures',
        expression: '',
        isTimestamp: false,
        isDate: false,
        isString: false,
        unit: 'none'
      },
      sqlColumn: {
        name: '"Avg of measures"',
        expression: SqlUtils.getAverageExpression(selectedMeasures)
      },
      aggregationFunction: 'NONE',
      timeSortOption: 'none',
      type: 'measure',
      sortDirection: 'DESC',
      dataScopeType: 'all',
      defaultType: 'measure'
    };
  }

  static createSelectedSortByTime(
    dimension: Dimension | Measure,
    timeSortOption: TimeSortOption,
    sortDirection: SortDirection,
    dataScopeType: DataScopeType
  ): Sort {
    return {
      timeSortOption,
      sortDirection,
      dataScopeType,
      measureOrDimension: dimension,
      sqlColumn: {
        name: SqlUtils.getSqlColumnName(dimension),
        expression: SqlUtils.getSqlColumnExpression(dimension)
      },
      aggregationFunction: 'NONE',
      type: 'time',
      defaultType: 'none'
    };
  }

  static createSelectedSortByMeasureOverLegendPartitionedByXAxisCategories(
    dimension: Dimension | Measure,
    xAxisCategoriesSelectedDimension: SelectedDimension,
    selectedSortByMeasure: Sort
  ): Sort {
    return {
      measureOrDimension: {
        name: `Sum ${selectedSortByMeasure.measureOrDimension.name} over ${dimension.name}`,
        expression: '',
        isTimestamp: false,
        isString: false,
        isDate: false,
        unit: 'none'
      },
      sqlColumn: {
        name: `"Sum ${selectedSortByMeasure.measureOrDimension.name} over ${dimension.name}"`,
        expression: `SUM(${selectedSortByMeasure.sqlColumn.expression}) OVER (PARTITION BY ${xAxisCategoriesSelectedDimension.dimension.name})`
      },
      aggregationFunction: 'NONE',
      timeSortOption: 'none',
      type: 'measure',
      sortDirection: 'DESC',
      dataScopeType: 'all',
      defaultType: 'measure over legend'
    };
  }
}