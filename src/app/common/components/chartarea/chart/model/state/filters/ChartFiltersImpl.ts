import type { ChartFilters } from './ChartFilters';
import type { DataScopeType } from '../types/DataScopeType';
import type { Filter } from './filter/Filter';
import type { AggregationFunction } from '../selectedmeasure/types/AggregationFunction';
import Utils, { isNot } from '../../../../../../utils/Utils';
import SqlUtils from '../../../../../../utils/SqlUtils';
import type { ChartData } from '../data/ChartData';
import type { FilterInputType } from './filter/inputtype/FilterInputType';
import FilterFactory from './filter/FilterFactory';
import type { Dimension } from '../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { DrillDown } from '../types/DrillDown';
import type { SelectedDimension } from '../selecteddimension/SelectedDimension';

export default class ChartFiltersImpl implements ChartFilters {
  filters: Filter[];

  chartData: ChartData;

  constructor(filters: Filter[], chartData: ChartData) {
    this.filters = filters;
    this.chartData = chartData;
  }

  addDimensionFilter(dimension: Dimension, filterInputType?: FilterInputType): Filter {
    const selectedFilter = FilterFactory.createDimensionFilter(dimension, filterInputType);
    this.filters = [...this.filters, selectedFilter];
    return selectedFilter;
  }

  addDrillDownFilter(drillDown: DrillDown) {
    const drillDownFilter = FilterFactory.createDrillDownFilter(drillDown, drillDown.value);
    this.filters = [...this.filters, drillDownFilter];
  }

  addMeasureFilter(measure: Measure, filterInputType?: FilterInputType): Filter {
    const selectedFilter = FilterFactory.createMeasureFilter(measure, filterInputType);
    this.filters = [...this.filters, selectedFilter];
    return selectedFilter;
  }

  addSelectionFilter(chartId: string, selectedDimension: SelectedDimension, filterExpression: string) {
    const selectedFilter = FilterFactory.createSelectionFilter(chartId, selectedDimension, filterExpression);
    this.filters = [...this.filters, selectedFilter];
  }

  changeFilterAggregationFunction(filter: Filter, aggregationFunction: AggregationFunction) {
    const newFilterConfiguration = {
      ...filter.getConfiguration(),
      aggregationFunction,
      sqlColumn: {
        name: SqlUtils.getSqlColumnName(filter.measureOrDimension, aggregationFunction),
        expression: SqlUtils.getSqlColumnExpression(filter.measureOrDimension, aggregationFunction)
      }
    };

    const newFilter = FilterFactory.createFilter(newFilterConfiguration);
    this.filters = Utils.replace(this.filters, filter, newFilter);
    this.chartData.filterChartData(this.filters, filter.dataScopeType);
  }

  changeFilterDataScopeType(filter: Filter, dataScopeType: DataScopeType) {
    const newFilterConfiguration = {
      ...filter.getConfiguration(),
      dataScopeType
    };

    const newFilter = FilterFactory.createFilter(newFilterConfiguration);
    this.filters = Utils.replace(this.filters, filter, newFilter);
  }

  changeFilterExpression(filter: Filter, filterExpression: string) {
    const newFilterConfiguration = {
      ...filter.getConfiguration(),
      filterExpression
    };

    const newFilter = FilterFactory.createFilter(newFilterConfiguration);
    this.filters = Utils.replace(this.filters, filter, newFilter);

    if (filter.dataScopeType === 'already fetched') {
      this.chartData.filterChartData(this.filters);
    }
  }

  changeFilterInputType(filter: Filter, filterInputType: FilterInputType): Filter {
    const filterExpression = filterInputType === 'Relative time filter' ? ' Minutes' : '';

    const newFilterConfiguration = {
      ...filter.getConfiguration(),
      filterExpression,
      filterInputType
    };

    const newFilter = FilterFactory.createFilter(newFilterConfiguration);
    this.filters = Utils.replace(this.filters, filter, newFilter);
    return newFilter;
  }

  getFilters(): Filter[] {
    return this.filters;
  }

  getLastDrillDownFilter(): Filter | null | undefined {
    return Utils.findLastElem(this.filters, 'isDrillDownFilter');
  }

  removeFilter(filter: Filter) {
    this.filters = this.filters.filter(isNot(filter));
    this.chartData.filterChartData(this.filters);
  }

  removeSelectionFilter(selectionChartId: string) {
    this.filters = this.filters.filter(
      ({ chartId, isSelectionFilter }: Filter) => !isSelectionFilter || chartId !== selectionChartId
    );

    this.chartData.filterChartData(this.filters);
  }

  removeQuickFilters() {
    this.filters = this.filters.filter(({ filterInputType }: Filter) => filterInputType !== 'Quick filter');
    this.chartData.filterChartData(this.filters);
  }
}
