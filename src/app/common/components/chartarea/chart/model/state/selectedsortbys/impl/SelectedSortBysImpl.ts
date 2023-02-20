import _ from 'lodash';
import type { SelectedSortBys } from '../SelectedSortBys';
import type { SelectedSortBy } from '../selectedsortby/SelectedSortBy';
import type { DefaultSelectedSortByType } from '../selectedsortby/types/DefaultSelectedSortByType';
import Utils from '../../../../../../../utils/Utils';
import type { Measure } from '../../../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/entities/Measure';
import type { Dimension } from '../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/types/Dimension';
import type { SelectedSortByType } from '../selectedsortby/types/SelectedfSortByType';
import type { SortDirection } from '../selectedsortby/types/SortDirection';
import SelectedSortByFactory from '../selectedsortby/factory/SelectedSortByFactory';
import type { TimeSortOption } from '../selectedsortby/types/TimeSortOption';
import type { DataScopeType } from '../../types/DataScopeType';
import type { SelectedDimension } from '../../selecteddimension/SelectedDimension';
import type { SelectedMeasure } from '../../selectedmeasure/SelectedMeasure';
import type { AggregationFunction } from '../../selectedmeasure/types/AggregationFunction';
import SqlUtils from '../../../../../../../utils/SqlUtils';
import { DimensionVisualizationType } from '../../selecteddimension/types/DimensionVisualizationType';
import { Chart } from '../../Chart';

export default class SelectedSortBysImpl implements SelectedSortBys {
  selectedSortBys: SelectedSortBy[];

  constructor(selectedSortBys: SelectedSortBy[]) {
    this.selectedSortBys = selectedSortBys;
  }

  addSelectedSortBy(
    measureOrDimension: Measure | Dimension,
    type: SelectedSortByType,
    sortDirection: SortDirection,
    defaultSortByType: DefaultSelectedSortByType = 'none',
    aggregationFunction: AggregationFunction = 'SUM'
  ): SelectedSortBy | null {
    const hasSameSelectedSortByAlready = Utils.has(this.selectedSortBys, 'measureOrDimension', measureOrDimension);

    if (!hasSameSelectedSortByAlready) {
      const newSelectedSortBy = SelectedSortByFactory.createSelectedSortBy(
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

  addSelectedSortByAverageOfMeasures(selectedMeasures: SelectedMeasure[]): SelectedSortBy | null | undefined {
    const newSelectedSortBy = SelectedSortByFactory.createSelectedSortByAverageOfMeasures(selectedMeasures);
    this.selectedSortBys = [...this.selectedSortBys, newSelectedSortBy];
    return newSelectedSortBy;
  }

  addSelectedSortByMeasureOverLegendPartitionedByXAxisCategories(
    dimension: Dimension | Measure,
    xAxisCategoriesSelectedDimension: SelectedDimension
  ): SelectedSortBy | null | undefined {
    const newSelectedSortBy = SelectedSortByFactory.createSelectedSortByMeasureOverLegendPartitionedByXAxisCategories(
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
  ): SelectedSortBy | null | undefined {
    const hasSameSelectedSortByAlready = Utils.has(this.selectedSortBys, 'timeSortOption', timeSortOption);

    if (!hasSameSelectedSortByAlready) {
      const newSelectedSortBy = SelectedSortByFactory.createSelectedSortByTime(
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

  changeSelectedSortByAggregationFunction(selectedSortBy: SelectedSortBy, aggregationFunction: AggregationFunction) {
    Utils.merge(this.selectedSortBys, selectedSortBy, {
      aggregationFunction,
      sqlColumn: {
        name: SqlUtils.getSqlColumnName(selectedSortBy.measureOrDimension, aggregationFunction),
        expression: SqlUtils.getSqlColumnExpression(selectedSortBy.measureOrDimension, aggregationFunction)
      }
    });
  }

  changeSelectedSortByDataScopeType(selectedSortBy: SelectedSortBy, dataScopeType: DataScopeType) {
    Utils.merge(this.selectedSortBys, selectedSortBy, {
      dataScopeType
    });
  }

  changeSelectedSortByDirection(selectedSortBy: SelectedSortBy, sortDirection: SortDirection) {
    Utils.merge(this.selectedSortBys, selectedSortBy, {
      sortDirection
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getConvertSelectedSortBys(selectedDimensions: SelectedDimension[]): SelectedSortBy[] {
    return this.selectedSortBys;
  }

  getDefaultOfType(defaultType: DefaultSelectedSortByType): SelectedSortBy | null | undefined {
    return Utils.findElem(this.selectedSortBys, 'defaultType', defaultType);
  }

  getSelectedSortBys(): SelectedSortBy[] {
    return this.selectedSortBys;
  }

  removeSelectedSortBy(selectedSortBy: SelectedSortBy) {
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
