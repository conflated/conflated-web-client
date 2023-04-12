import _ from 'lodash';
import type { ChartSorts } from '../ChartSorts';
import type { Sort } from '../sort/Sort';
import type { DefaultSortType } from '../sort/types/DefaultSortType';
import Utils from '../../../../../../../utils/Utils';
import type { Measure } from '../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { SelectedSortByType } from '../sort/types/SortType';
import type { SortDirection } from '../sort/types/SortDirection';
import SortFactory from '../sort/SortFactory';
import type { TimeSortOption } from '../sort/types/TimeSortOption';
import type { DataScopeType } from '../../types/DataScopeType';
import type { SelectedDimension } from '../../selecteddimension/SelectedDimension';
import type { SelectedMeasure } from '../../selectedmeasure/SelectedMeasure';
import type { AggregationFunction } from '../../selectedmeasure/types/AggregationFunction';
import SqlUtils from '../../../../../../../utils/SqlUtils';
import { DimensionVisualizationType } from '../../selecteddimension/DimensionVisualizationType';
import { Chart } from '../../Chart';

export default class ChartSortsImpl implements ChartSorts {
  selectedSortBys: Sort[];

  constructor(selectedSortBys: Sort[]) {
    this.selectedSortBys = selectedSortBys;
  }

  addSelectedSortBy(
    measureOrDimension: Measure | Dimension,
    type: SelectedSortByType,
    sortDirection: SortDirection,
    defaultSortByType: DefaultSortType = 'none',
    aggregationFunction: AggregationFunction = 'SUM'
  ): Sort | null {
    const hasSameSelectedSortByAlready = Utils.has(this.selectedSortBys, 'measureOrDimension', measureOrDimension);

    if (!hasSameSelectedSortByAlready) {
      const newSelectedSortBy = SortFactory.createSelectedSortBy(
        measureOrDimension,
        type,
        sortDirection,
        this.selectedSortBys.length === 0 ? 'all' : 'already fetched',
        defaultSortByType,
        aggregationFunction
      );

      this.selectedSortBys = [...this.selectedSortBys, newSelectedSortBy];
      return newSelectedSortBy;
    }

    return null;
  }

  addSelectedSortByAverageOfMeasures(selectedMeasures: SelectedMeasure[]): Sort | null | undefined {
    const newSelectedSortBy = SortFactory.createSelectedSortByAverageOfMeasures(selectedMeasures);
    this.selectedSortBys = [...this.selectedSortBys, newSelectedSortBy];
    return newSelectedSortBy;
  }

  addSelectedSortByMeasureOverLegendPartitionedByXAxisCategories(
    dimension: Dimension | Measure,
    xAxisCategoriesSelectedDimension: SelectedDimension
  ): Sort | null | undefined {
    const newSelectedSortBy = SortFactory.createSelectedSortByMeasureOverLegendPartitionedByXAxisCategories(
      dimension,
      xAxisCategoriesSelectedDimension,
      this.selectedSortBys[0]
    );

    this.selectedSortBys = [...this.selectedSortBys, newSelectedSortBy];
    return newSelectedSortBy;
  }

  addSelectedSortByTime(
    dimension: Dimension | Measure,
    timeSortOption: TimeSortOption,
    sortDirection: SortDirection
  ): Sort | null | undefined {
    const hasSameSelectedSortByAlready = Utils.has(this.selectedSortBys, 'timeSortOption', timeSortOption);

    if (!hasSameSelectedSortByAlready) {
      const newSelectedSortBy = SortFactory.createSelectedSortByTime(
        dimension,
        timeSortOption,
        sortDirection,
        this.selectedSortBys.length === 0 ? 'all' : 'already fetched'
      );

      this.selectedSortBys = [...this.selectedSortBys, newSelectedSortBy];
      return newSelectedSortBy;
    }

    return null;
  }

  changeSelectedSortByAggregationFunction(selectedSortBy: Sort, aggregationFunction: AggregationFunction) {
    this.selectedSortBys = Utils.merge(this.selectedSortBys, selectedSortBy, {
      aggregationFunction,
      sqlColumn: {
        name: SqlUtils.getSqlColumnName(selectedSortBy.measureOrDimension, aggregationFunction),
        expression: SqlUtils.getSqlColumnExpression(selectedSortBy.measureOrDimension, aggregationFunction)
      }
    });
  }

  changeSelectedSortByDataScopeType(selectedSortBy: Sort, dataScopeType: DataScopeType) {
    this.selectedSortBys = Utils.merge(this.selectedSortBys, selectedSortBy, {
      dataScopeType
    });
  }

  changeSelectedSortByDirection(selectedSortBy: Sort, sortDirection: SortDirection) {
    this.selectedSortBys = Utils.merge(this.selectedSortBys, selectedSortBy, {
      sortDirection
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getConvertSelectedSortBys(selectedDimensions: SelectedDimension[]): Sort[] {
    return this.selectedSortBys;
  }

  getDefaultOfType(defaultType: DefaultSortType): Sort | null | undefined {
    return Utils.findElem(this.selectedSortBys, 'defaultType', defaultType);
  }

  getSelectedSortBys(): Sort[] {
    return this.selectedSortBys;
  }

  removeSelectedSortBy(selectedSortBy: Sort) {
    this.selectedSortBys = _.without(this.selectedSortBys, selectedSortBy);
  }

  updateSelectedSortBysWhenAddingSelectedDimension(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    measureOrDimension: Dimension | Measure,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    visualizationType: DimensionVisualizationType,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    chart: Chart
  ): void {}

  updateSelectedSortBysWhenAddingSelectedMeasure(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    measureOrDimension: Measure | Dimension,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selectedMeasures: SelectedMeasure[]
  ): void {}

  updateSelectedSortBysWhenChangingSelectedMeasureAggregationFunction(
    aggregationFunction: AggregationFunction,
    selectedMeasures: SelectedMeasure[]
  ) {
    if (this.selectedSortBys.length === 1 && this.selectedSortBys[0].defaultType === 'measure') {
      if (selectedMeasures.length === 1) {
        this.changeSelectedSortByAggregationFunction(this.selectedSortBys[0], aggregationFunction);
      } else if (selectedMeasures.length > 1) {
        this.selectedSortBys = [];
        this.addSelectedSortByAverageOfMeasures(selectedMeasures);
      }
    }
  }

  updateSelectedSortBysWhenRemovingSelectedDimension(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selectedDimension: SelectedDimension,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selectedMeasures: SelectedMeasure[]
  ): void {}

  updateSelectedSortBysWhenRemovingSelectedMeasure(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selectedMeasure: SelectedMeasure,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selectedMeasures: SelectedMeasure[]
  ): void {}
}
