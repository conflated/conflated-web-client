import type { ChartFilters } from './ChartFilters';
import type { DataScope } from '../types/DataScope';
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
import { Chart } from '../Chart';
import { FilterConfiguration } from './filter/FilterConfiguration';

export default class ChartFiltersImpl implements ChartFilters {
  filters: Filter[];

  chartData: ChartData;

  constructor(filters: Filter[], chartData: ChartData) {
    this.filters = filters;
    this.chartData = chartData;
  }

  addDimensionFilter(dimension: Dimension, filterInputType?: FilterInputType): Filter {
    const filter = FilterFactory.createDimensionFilter(dimension, filterInputType);
    this.filters = [...this.filters, filter];
    return filter;
  }

  addDrillDownFilter(drillDown: DrillDown) {
    const drillDownFilter = FilterFactory.createDrillDownFilter(drillDown, drillDown.value);
    this.filters = [...this.filters, drillDownFilter];
  }

  addMeasureFilter(measure: Measure, filterInputType?: FilterInputType): Filter {
    const filter = FilterFactory.createMeasureFilter(measure, filterInputType);
    this.filters = [...this.filters, filter];
    return filter;
  }

  addChartFilter(filteringChart: Chart) {
    const filter = FilterFactory.createChartFilter(filteringChart);

    if (filter) {
      this.filters = [...this.filters, filter];
    }
  }

  changeFilterAggregationFunction(filter: Filter, aggregationFunction: AggregationFunction) {
    const newFilterConfiguration: FilterConfiguration = {
      ...filter.getConfiguration(),
      aggregationFunction,
      sqlColumn: {
        name: SqlUtils.getSqlColumnName(filter.measureOrDimension, aggregationFunction),
        expression: SqlUtils.getSqlColumnExpression(filter.measureOrDimension, aggregationFunction)
      }
    };

    const newFilter = FilterFactory.createFilter(newFilterConfiguration);
    this.filters = Utils.replace(this.filters, filter, newFilter);
    this.chartData.filter(this.filters, filter.dataScope);
  }

  changeFilterDataScope(filter: Filter, dataScope: DataScope) {
    const newFilterConfiguration: FilterConfiguration = {
      ...filter.getConfiguration(),
      dataScopeType: dataScope
    };

    const newFilter = FilterFactory.createFilter(newFilterConfiguration);
    this.filters = Utils.replace(this.filters, filter, newFilter);
  }

  changeFilterExpression(filter: Filter, filterExpression: string) {
    const newFilterConfiguration: FilterConfiguration = {
      ...filter.getConfiguration(),
      filterExpression
    };

    const newFilter = FilterFactory.createFilter(newFilterConfiguration);
    this.filters = Utils.replace(this.filters, filter, newFilter);

    if (filter.dataScope === 'already fetched') {
      this.chartData.filter(this.filters);
    }
  }

  changeFilterInputType(filter: Filter, filterInputType: FilterInputType): Filter {
    const filterExpression = filterInputType === 'Relative time filter' ? ' Minutes' : '';

    const newFilterConfiguration: FilterConfiguration = {
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
    this.chartData.filter(this.filters);
  }

  removeChartFilter(filteringChart: Chart) {
    this.filters = this.filters.filter((filter) => filter.filteringChart !== filteringChart);
    this.chartData.filter(this.filters);
  }

  removeQuickFilters() {
    this.filters = this.filters.filter(({ filterInputType }: Filter) => filterInputType !== 'Quick filter');
    this.chartData.filter(this.filters);
  }
}
