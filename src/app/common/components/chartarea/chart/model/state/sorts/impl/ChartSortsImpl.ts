import _ from 'lodash';
import type { ChartSorts } from '../ChartSorts';
import type { Sort } from '../sort/Sort';
import type { DefaultSortType } from '../sort/types/DefaultSortType';
import Utils from '../../../../../../../utils/Utils';
import type { Measure } from '../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { SortType } from '../sort/types/SortType';
import type { SortDirection } from '../sort/types/SortDirection';
import SortFactory from '../sort/SortFactory';
import type { TimeSortOption } from '../sort/types/TimeSortOption';
import type { DataScope } from '../../types/DataScope';
import type { SelectedDimension } from '../../selecteddimension/SelectedDimension';
import type { SelectedMeasure } from '../../selectedmeasure/SelectedMeasure';
import type { AggregationFunction } from '../../selectedmeasure/types/AggregationFunction';
import SqlUtils from '../../../../../../../utils/SqlUtils';
import { DimensionVisualizationType } from '../../selecteddimension/DimensionVisualizationType';
import { Chart } from '../../Chart';

export default class ChartSortsImpl implements ChartSorts {
  sorts: Sort[];

  constructor(sorts: Sort[]) {
    this.sorts = sorts;
  }

  addSort(
    measureOrDimension: Measure | Dimension,
    type: SortType,
    sortDirection: SortDirection,
    defaultSortByType: DefaultSortType = 'none',
    aggregationFunction: AggregationFunction = 'SUM'
  ): Sort | null {
    const hasSameSelectedSortByAlready = Utils.has(this.sorts, 'measureOrDimension', measureOrDimension);

    if (!hasSameSelectedSortByAlready) {
      const newSelectedSortBy = SortFactory.createSort(
        measureOrDimension,
        type,
        sortDirection,
        this.sorts.length === 0 ? 'all' : 'already fetched',
        defaultSortByType,
        aggregationFunction
      );

      this.sorts = [...this.sorts, newSelectedSortBy];
      return newSelectedSortBy;
    }

    return null;
  }

  addSortByAverageOfMeasures(selectedMeasures: SelectedMeasure[]): Sort | null | undefined {
    const newSelectedSortBy = SortFactory.createSelectedSortByAverageOfMeasures(selectedMeasures);
    this.sorts = [...this.sorts, newSelectedSortBy];
    return newSelectedSortBy;
  }

  addSortByMeasureOverLegendPartitionedByXAxisCategories(
    dimension: Dimension | Measure,
    xAxisCategoriesSelectedDimension: SelectedDimension
  ): Sort | null | undefined {
    const newSelectedSortBy = SortFactory.createSelectedSortByMeasureOverLegendPartitionedByXAxisCategories(
      dimension,
      xAxisCategoriesSelectedDimension,
      this.sorts[0]
    );

    this.sorts = [...this.sorts, newSelectedSortBy];
    return newSelectedSortBy;
  }

  addSortByTime(
    dimension: Dimension | Measure,
    timeSortOption: TimeSortOption,
    sortDirection: SortDirection
  ): Sort | null | undefined {
    const hasSameSelectedSortByAlready = Utils.has(this.sorts, 'timeSortOption', timeSortOption);

    if (!hasSameSelectedSortByAlready) {
      const newSelectedSortBy = SortFactory.createSelectedSortByTime(
        dimension,
        timeSortOption,
        sortDirection,
        this.sorts.length === 0 ? 'all' : 'already fetched'
      );

      this.sorts = [...this.sorts, newSelectedSortBy];
      return newSelectedSortBy;
    }

    return null;
  }

  changeSortAggregationFunction(sort: Sort, aggregationFunction: AggregationFunction) {
    this.sorts = Utils.merge(this.sorts, sort, {
      aggregationFunction,
      sqlColumn: {
        name: SqlUtils.getSqlColumnName(sort.measureOrDimension, aggregationFunction),
        expression: SqlUtils.getSqlColumnExpression(sort.measureOrDimension, aggregationFunction)
      }
    });
  }

  changeSortDataScope(sort: Sort, dataScope: DataScope) {
    this.sorts = Utils.merge(this.sorts, sort, {
      dataScope
    });
  }

  changeSortDirection(sort: Sort, direction: SortDirection) {
    this.sorts = Utils.merge(this.sorts, sort, {
      direction
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getConvertedSorts(selectedDimensions: SelectedDimension[]): Sort[] {
    return this.sorts;
  }

  getDefaultSortOfType(defaultType: DefaultSortType): Sort | null | undefined {
    return Utils.findElem(this.sorts, 'defaultType', defaultType);
  }

  getSorts(): Sort[] {
    return this.sorts;
  }

  removeSort(sort: Sort) {
    this.sorts = _.without(this.sorts, sort);
  }

  updateSortsWhenAddingSelectedDimension(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    measureOrDimension: Dimension | Measure,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    visualizationType: DimensionVisualizationType,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    chart: Chart
  ): void {}

  updateSortsWhenAddingSelectedMeasure(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    measureOrDimension: Measure | Dimension,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selectedMeasures: SelectedMeasure[]
  ): void {}

  updateSortsWhenChangingSelectedMeasureAggregationFunction(
    aggregationFunction: AggregationFunction,
    selectedMeasures: SelectedMeasure[]
  ) {
    if (this.sorts.length === 1 && this.sorts[0].defaultType === 'measure') {
      if (selectedMeasures.length === 1) {
        this.changeSortAggregationFunction(this.sorts[0], aggregationFunction);
      } else if (selectedMeasures.length > 1) {
        this.sorts = [];
        this.addSortByAverageOfMeasures(selectedMeasures);
      }
    }
  }

  updateSortsWhenRemovingSelectedDimension(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selectedDimension: SelectedDimension,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selectedMeasures: SelectedMeasure[]
  ): void {}

  updateSortsWhenRemovingSelectedMeasure(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selectedMeasure: SelectedMeasure,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selectedMeasures: SelectedMeasure[]
  ): void {}
}
