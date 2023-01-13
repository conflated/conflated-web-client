import type { DataScopeType } from '../../../../../../../../model/state/types/DataScopeType';
import type { SelectedSortBy } from '../SelectedSortBy';
import type { Measure } from '../../../../../../../../../pages/dataexplorerpage/leftpane/measureselector/model/state/entities/Measure';
import type { SortDirection } from '../types/SortDirection';
import type { TimeSortOption } from '../types/TimeSortOption';
import type { Dimension } from '../../../../../../../../../pages/dataexplorerpage/leftpane/dimensionselector/model/state/entities/Dimension';
import type { SelectedMeasure } from '../../../selectedmeasure/SelectedMeasure';
import type { SelectedDimension } from '../../../selecteddimension/SelectedDimension';
import type { SelectedSortByType } from '../types/SelectedfSortByType';
import type { DefaultSelectedSortByType } from '../types/DefaultSelectedSortByType';
import SqlUtils from '../../../../../../../../model/state/utils/SqlUtils';
import type { AggregationFunction } from '../../../selectedmeasure/types/AggregationFunction';

export default class SelectedSortByFactory {
  static createSelectedSortBy(
    measureOrDimension: Measure | Dimension,
    type: SelectedSortByType,
    sortDirection: SortDirection,
    dataScopeType: DataScopeType,
    defaultType: DefaultSelectedSortByType,
    aggregationFunction: AggregationFunction = 'SUM'
  ): SelectedSortBy {
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

  static createSelectedSortByAverageOfMeasures(selectedMeasures: SelectedMeasure[]): SelectedSortBy {
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
  ): SelectedSortBy {
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
    selectedSortByMeasure: SelectedSortBy
  ): SelectedSortBy {
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
