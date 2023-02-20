import _ from 'lodash';
import type { SelectedFilters } from './SelectedFilters';
import type { DataScopeType } from '../types/DataScopeType';
import type { SelectedFilter } from './selectedfilter/SelectedFilter';
import type { AggregationFunction } from '../selectedmeasure/types/AggregationFunction';
import Utils from '../../../../../../utils/Utils';
import SqlUtils from '../../../../../../utils/SqlUtils';
import type { ChartData } from '../chartdata/ChartData';
import type { FilterInputType } from './selectedfilter/types/FilterInputType';
import SelectedFilterFactory from './selectedfilter/factory/SelectedFilterFactory';
import type { Dimension } from '../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/entities/Dimension';
import type { Measure } from '../../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/entities/Measure';
import type { DrillDown } from '../types/DrillDown';
import type { SelectedDimension } from '../selecteddimension/SelectedDimension';

export default class SelectedFiltersImpl implements SelectedFilters {
  selectedFilters: SelectedFilter[];

  chartData: ChartData;

  constructor(selectedFilters: SelectedFilter[], chartData: ChartData) {
    this.selectedFilters = selectedFilters;
    this.chartData = chartData;
  }

  addDimensionSelectedFilter(dimension: Dimension): SelectedFilter {
    const selectedFilter = SelectedFilterFactory.createDimensionSelectedFilter(dimension);
    this.selectedFilters = [...this.selectedFilters, selectedFilter];
    return selectedFilter;
  }

  addDrillDownFilter(drillDown: DrillDown) {
    const drillDownFilter = SelectedFilterFactory.createDrillDownFilter(drillDown, drillDown.value);
    this.selectedFilters = [...this.selectedFilters, drillDownFilter];
  }

  addMeasureSelectedFilter(measure: Measure): SelectedFilter {
    const selectedFilter = SelectedFilterFactory.createMeasureSelectedFilter(measure);
    this.selectedFilters = [...this.selectedFilters, selectedFilter];
    return selectedFilter;
  }

  addSelectionFilter(chartId: string, selectedDimension: SelectedDimension, filterExpression: string) {
    const selectedFilter = SelectedFilterFactory.createSelectionFilter(chartId, selectedDimension, filterExpression);

    this.selectedFilters = [...this.selectedFilters, selectedFilter];
  }

  changeSelectedFilterAggregationFunction(selectedFilter: SelectedFilter, aggregationFunction: AggregationFunction) {
    Utils.merge(this.selectedFilters, selectedFilter, {
      aggregationFunction,
      sqlColumn: {
        name: SqlUtils.getSqlColumnName(selectedFilter.measureOrDimension, aggregationFunction),
        expression: SqlUtils.getSqlColumnExpression(selectedFilter.measureOrDimension, aggregationFunction)
      }
    });

    this.chartData.filterChartData(this.selectedFilters, selectedFilter.dataScopeType);
  }

  changeSelectedFilterDataScopeType(selectedFilter: SelectedFilter, dataScopeType: DataScopeType) {
    Utils.merge(this.selectedFilters, selectedFilter, {
      dataScopeType
    });
  }

  changeSelectedFilterExpression(selectedFilter: SelectedFilter, filterExpression: string) {
    Utils.merge(this.selectedFilters, selectedFilter, {
      filterExpression
    });
  }

  changeSelectedFilterInputType(selectedFilter: SelectedFilter, filterInputType: FilterInputType): SelectedFilter {
    const filterExpression = filterInputType === 'Relative time filter' ? ' Minutes' : '';

    const newSelectedFilterConfiguration = {
      ...selectedFilter.getConfiguration(),
      filterExpression,
      filterInputType
    };

    const newSelectedFilter = SelectedFilterFactory.createSelectedFilter(newSelectedFilterConfiguration);
    Utils.replace(this.selectedFilters, selectedFilter, newSelectedFilter);
    return newSelectedFilter;
  }

  getSelectedFilters(): SelectedFilter[] {
    return this.selectedFilters;
  }

  getLastDrillDownFilter(): SelectedFilter | null | undefined {
    return Utils.findLastElem(this.selectedFilters, 'isDrillDownFilter');
  }

  removeSelectedFilter(selectedFilter: SelectedFilter) {
    this.selectedFilters = _.without(this.selectedFilters, selectedFilter);
    this.chartData.filterChartData(this.selectedFilters);
  }

  removeSelectionFilter(selectionChartId: string) {
    this.selectedFilters = this.selectedFilters.filter(
      ({ chartId, isSelectionFilter }: SelectedFilter) => !isSelectionFilter || chartId !== selectionChartId
    );

    this.chartData.filterChartData(this.selectedFilters);
  }
}
