/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import type { SelectedDimension } from '../selecteddimension/SelectedDimension';
import type { SelectedMeasure } from '../selectedmeasure/SelectedMeasure';
import type { Chart } from '../Chart';
import type { ChartType } from '../types/ChartType';
import type { DataSource } from '../datasource/DataSource';
import type { DimensionVisualizationType } from '../selecteddimension/types/DimensionVisualizationType';
import type { MeasureVisualizationType } from '../selectedmeasure/types/MeasureVisualizationType';
import type { ChartMenuConfirmationType } from '../types/ChartMenuConfirmationType';
import type { ChartConfiguration } from '../ChartConfiguration';
import type { DataPoint } from '../types/DataPoint';
import type { DrillDown } from '../types/DrillDown';
import SelectedFiltersImpl from '../selectedfilters/SelectedFiltersImpl';
import SelectedSortBysImpl from '../selectedsortbys/impl/SelectedSortBysImpl';
import type { SelectedSortBys } from '../selectedsortbys/SelectedSortBys';
import type { SelectedFilters } from '../selectedfilters/SelectedFilters';
import type { FillType } from '../types/FillType';
import ChartFactory from '../ChartFactory';
import type { AggregationFunction } from '../selectedmeasure/types/AggregationFunction';
import ChartDataImpl from '../chartdata/ChartDataImpl';
import type { ChartData } from '../chartdata/ChartData';
import type { Dimension } from '../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import SelectedDimensionFactory from '../selecteddimension/factory/SelectedDimensionFactory';
import type { Theme } from '../../../../../../../page/dataexplorer/model/state/types/Theme';
import SelectedMeasureFactory from '../selectedmeasure/factory/SelectedMeasureFactory';
import Utils from '../../../../../../utils/Utils';
import SqlUtils from '../../../../../../utils/SqlUtils';
import type { DataSeries } from '../types/DataSeries';
import type { SelectedFilter } from '../selectedfilters/selectedfilter/SelectedFilter';
import type { ColumnNameToValuesMap } from '../chartdata/ColumnNameToValuesMap';
import emptyDataSource from '../datasource/emptyDataSource';
import type { SelectedSortBy } from '../selectedsortbys/selectedsortby/SelectedSortBy';
import type { LegendPosition } from '../types/LegendPosition';
import Constants from '../../../../../../Constants';
import type { GridItem } from '../../../../model/state/types/GridItem';
import type { Layout } from '../../../../model/state/types/Layout';
import type { Column } from '../types/Column';
import DimensionDropZoneListItemViewFactory from '../../../../../../../page/dataexplorer/pane/left/selector/dimension/view/dimensiondropzonelistitemviewfactory/DimensionDropZoneListItemViewFactory';
import { ChartAreaStateNamespace } from '../../../../model/state/types/ChartAreaStateNamespace';

export default abstract class AbstractChart implements Chart {
  id = '1';

  chartType: ChartType = 'column';

  dataSource: DataSource = emptyDataSource;

  selectedMeasures: SelectedMeasure[] = [];

  selectedDimensions: SelectedDimension[] = [];

  selectedFilters: SelectedFilters = new SelectedFiltersImpl([], new ChartDataImpl());

  selectedSortBys: SelectedSortBys = new SelectedSortBysImpl([]);

  chartData: ChartData = new ChartDataImpl();

  xAxisCategoriesShownCount = 10;

  fetchedRowCount = 1000;

  xAxisScrollPosition?: number = 0;

  isFetchingChartData?: boolean = false;

  selectedDataPointIndex?: number = undefined;

  selectedDataPoints: DataPoint[] = [];

  currentDrillDownSelectedDimension?: SelectedDimension = undefined;

  drillDowns?: DrillDown[] = [];

  isExportMenuOpen?: boolean = false;

  exportMenuCloseTimeoutID?: ReturnType<typeof setTimeout> | 0 = undefined;

  menuConfirmationType?: ChartMenuConfirmationType = undefined;

  constructor(chartConfiguration?: ChartConfiguration) {
    if (chartConfiguration) {
      this.id = chartConfiguration.id;
      this.chartType = chartConfiguration.chartType;
      this.dataSource = chartConfiguration.dataSource;
      this.selectedMeasures = chartConfiguration.selectedMeasures;
      this.selectedDimensions = chartConfiguration.selectedDimensions;
      this.chartData = new ChartDataImpl(chartConfiguration.chartData);
      this.selectedFilters = new SelectedFiltersImpl(chartConfiguration.selectedFilters, this.chartData);
      this.selectedSortBys = new SelectedSortBysImpl(chartConfiguration.selectedSortBys);
      this.xAxisCategoriesShownCount = chartConfiguration.xAxisCategoriesShownCount;
      this.fetchedRowCount = chartConfiguration.fetchedRowCount;
      this.xAxisScrollPosition = chartConfiguration.xAxisScrollPosition;
      this.isFetchingChartData = chartConfiguration.isFetchingChartData;
      this.selectedDataPointIndex = chartConfiguration.selectedDataPointIndex;
      this.drillDowns = chartConfiguration.drillDowns ?? [];
      this.selectedDataPoints = chartConfiguration.selectedDataPoints ?? [];
      this.isExportMenuOpen = chartConfiguration.isExportMenuOpen;
      this.exportMenuCloseTimeoutID = chartConfiguration.exportMenuCloseTimeoutID;
      this.menuConfirmationType = chartConfiguration.menuConfirmationType;
    }
  }

  addSelectedDimension(dimension: Dimension | Measure, visualizationType: DimensionVisualizationType) {
    const newSelectedDimension = SelectedDimensionFactory.createSelectedDimension(
      dimension,
      visualizationType,
      this.getAllColors()[0]
    );

    this.selectedDimensions = [...this.selectedDimensions, newSelectedDimension];
  }

  addSelectedMeasure(measureOrDimension: Measure | Dimension, aggregationFunction: AggregationFunction) {
    const measureVisualizationType = this.getNextMeasureVisualizationType();

    if (measureVisualizationType !== 'none') {
      const newSelectedMeasure = SelectedMeasureFactory.createSelectedMeasure(
        measureOrDimension,
        aggregationFunction,
        measureVisualizationType,
        this.getAllColors()[this.selectedMeasures.length % this.getAllColors().length]
      );

      this.selectedMeasures = [...this.selectedMeasures, newSelectedMeasure];
    }
  }

  changeSelectedDimensionColor(selectedDimension: SelectedDimension, color: string) {
    this.selectedDimensions = Utils.merge(this.selectedDimensions, selectedDimension, {
      visualizationColor: color
    });
  }

  changeSelectedMeasureAggregationFunction(selectedMeasure: SelectedMeasure, aggregationFunction: AggregationFunction) {
    this.selectedMeasures = Utils.merge(this.selectedMeasures, selectedMeasure, {
      aggregationFunction,
      sqlColumn: {
        name: SqlUtils.getSqlColumnName(selectedMeasure.measure, aggregationFunction),
        expression: SqlUtils.getSqlColumnExpression(selectedMeasure.measure, aggregationFunction)
      }
    });

    this.selectedSortBys.updateSelectedSortBysWhenChangingSelectedMeasureAggregationFunction(
      aggregationFunction,
      this.selectedMeasures
    );
  }

  changeSelectedMeasureColor(selectedMeasure: SelectedMeasure, color: string) {
    this.selectedMeasures = Utils.merge(this.selectedMeasures, selectedMeasure, {
      visualizationColor: color
    });
  }

  changeSelectedMeasureTypeAndColor(
    selectedMeasure: SelectedMeasure,
    visualizationType: MeasureVisualizationType,
    visualizationColor: string
  ) {
    this.selectedMeasures = Utils.merge(this.selectedMeasures, selectedMeasure, {
      visualizationType,
      visualizationColor
    });
  }

  abstract createChartView(
    width: number,
    height: number,
    stateNamespace: ChartAreaStateNamespace,
    actions: Record<string, (...args: any[]) => void>
  ): JSX.Element;

  deselectDataPoint(dataPoint: DataPoint) {
    this.selectedDataPoints = this.selectedDataPoints.filter(
      (selectedDataPoint: DataPoint) =>
        selectedDataPoint.dataSeriesIndex !== dataPoint.dataSeriesIndex ||
        selectedDataPoint.labelIndex !== dataPoint.labelIndex
    );
  }

  abstract drillDown(drillDown: DrillDown, newDrillDownSelectedDimension: SelectedDimension): void;

  drillUp(): boolean {
    throw new Error('Abstract method');
  }

  exportToPdf() {
    throw new Error('Abstract method');
  }

  exportToPng() {
    throw new Error('Abstract method');
  }

  exportToSvg() {
    throw new Error('Abstract method');
  }

  getAllColors(theme?: Theme): string[] {
    return theme?.colors ?? ['#005AFF', '#23ABB6', '#F7B737', '#F47F31', '#E03DCD', '#7D33F2', '#37CC73', '#E23B3B'];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getApexChartDataSeries(shownXAxisCategories: Array<any>): DataSeries[] | any[] {
    throw new Error('Abstract method called');
  }

  getApexChartType(): string {
    return this.chartType === 'column' ? 'bar' : this.chartType;
  }

  getApexXAxisOptions(): object {
    return {};
  }

  getChartConfigHintSubtitle(): string {
    if (this.selectedMeasures.length === 0 && this.selectedDimensions.length === 0) {
      return 'To add, click a measure or dimension name';
    }

    return '';
  }

  getChartConfigHintTitle(): string {
    if (this.selectedMeasures.length === 0 && this.selectedDimensions.length === 0) {
      return 'Add a measure or dimension';
    } else if (this.selectedMeasures.length === 0) {
      return 'Add a measure';
    } else if (this.selectedDimensions.length === 0) {
      return 'Add a dimension';
    }

    return '';
  }

  getChartConfiguration(): ChartConfiguration {
    return {
      id: this.id,
      chartType: this.chartType,
      dataSource: this.dataSource,
      selectedMeasures: this.selectedMeasures,
      selectedDimensions: this.selectedDimensions,
      selectedFilters: this.getSelectedFilters(),
      selectedSortBys: this.getSelectedSortBys(),
      chartData: this.chartData.getColumnNameToValuesMap(),
      xAxisCategoriesShownCount: this.xAxisCategoriesShownCount,
      fetchedRowCount: this.fetchedRowCount,
      xAxisScrollPosition: this.xAxisScrollPosition,
      isFetchingChartData: this.isFetchingChartData,
      selectedDataPointIndex: this.selectedDataPointIndex,
      drillDowns: this.drillDowns,
      selectedDataPoints: this.selectedDataPoints,
      isExportMenuOpen: this.isExportMenuOpen,
      exportMenuCloseTimeoutID: this.exportMenuCloseTimeoutID,
      menuConfirmationType: this.menuConfirmationType
    };
  }

  getChartDataForSelectedDimensionOfType(dimensionVisualizationType: DimensionVisualizationType): Array<any> {
    return this.chartData.getForSelectedDimensionOfType(this.selectedDimensions, dimensionVisualizationType);
  }

  getChartJsDataSetsAndLabels(): object {
    return {};
  }

  getColors(): string[] {
    const legendSelectedDimension = this.getSelectedDimensionOfType('Legend');
    const allColors = this.getAllColors();

    if (legendSelectedDimension && legendSelectedDimension.dimension.isTimestamp) {
      return [this.selectedMeasures[0]?.visualizationColor ?? allColors[0]];
    } else if (this.selectedMeasures.length > 0) {
      return this.selectedMeasures.map(
        ({ visualizationColor }: SelectedMeasure, index: number) =>
          visualizationColor || allColors[index % allColors.length]
      );
    }

    return allColors;
  }

  getConvertSelectedMeasures(): SelectedMeasure[] {
    return this.selectedMeasures.map(
      (selectedMeasure: SelectedMeasure, index: number): SelectedMeasure => ({
        ...selectedMeasure,
        aggregationFunction: this.getValidAggregationFunction(selectedMeasure.aggregationFunction),
        visualizationType: this.getNextMeasureVisualizationType(selectedMeasure.visualizationType, index),
        visualizationColor: selectedMeasure.visualizationColor
      })
    );
  }

  getConvertedSelectedDimensions(): SelectedDimension[] {
    return this.selectedDimensions;
  }

  abstract getDimensionDropZoneListItemViews(
    dimensionDropZoneListItemViewFactory: DimensionDropZoneListItemViewFactory
  ): Array<JSX.Element>;

  getFillOpacity(): number {
    return Constants.DEFAULT_FILL_OPACITY;
  }

  getFillType(): FillType {
    return this.selectedMeasures.length > 0 ? 'gradient' : 'solid';
  }

  getGradientFillType(): FillType | FillType[] {
    if (this.selectedMeasures.length > 0) {
      return this.selectedMeasures.map(({ visualizationType }: SelectedMeasure) =>
        visualizationType === 'area' ? 'gradient' : 'solid'
      );
    }

    return 'gradient';
  }

  getHeight(layout: Layout, chartAreaHeight: number): number {
    return (
      _.head(
        Utils.pick(layout, 'i', this.id).map(
          (gridItem: GridItem) => (gridItem.h / Constants.GRID_ROW_COUNT) * chartAreaHeight
        )
      ) ?? 0
    );
  }

  getLabels(): any[] | null | undefined {
    return [];
  }

  getLegendType(): string {
    throw new Error('Abstract method');
  }

  getMaxScrollPosition(): number {
    return 0;
  }

  getMeasureVisualizationColorFor(
    selectedMeasure: SelectedMeasure,
    measureVisualizationType: MeasureVisualizationType
  ): string {
    if (measureVisualizationType === 'radius' || measureVisualizationType === 'tooltip') {
      const previousSelectedMeasureIndex = this.selectedMeasures.indexOf(selectedMeasure) - 1;

      if (previousSelectedMeasureIndex >= 0) {
        return this.selectedMeasures[previousSelectedMeasureIndex].visualizationColor;
      }
    }

    return selectedMeasure.visualizationColor;
  }

  getNewChartOfType(newChartType: ChartType): Chart {
    const selectedDimensionsWithPreviousType = this.selectedDimensions
      .filter((selectedDimension: SelectedDimension) => selectedDimension.previousVisualizationType)
      .map((selectedDimension: SelectedDimension) => ({
        ...selectedDimension,
        visualizationType: selectedDimension.previousVisualizationType ?? 'none'
      }));

    const newChart = ChartFactory.createChart({
      ...this.getChartConfiguration(),
      chartType: newChartType
    });

    if (this.selectedDimensions.length === selectedDimensionsWithPreviousType.length) {
      newChart.selectedDimensions = selectedDimensionsWithPreviousType;
    } else {
      newChart.selectedDimensions = newChart.getConvertedSelectedDimensions();
    }

    newChart.selectedMeasures = newChart.getConvertSelectedMeasures();

    newChart.selectedSortBys = new SelectedSortBysImpl(
      newChart.selectedSortBys.getConvertSelectedSortBys(this.selectedDimensions)
    );

    if (newChart.selectedSortBys !== this.selectedSortBys) {
      this.chartData.sortChartData(newChart.getSelectedSortBys(), 'all');
    }

    return newChart;
  }

  getNextDimensionVisualizationType(): DimensionVisualizationType {
    return 'Drilldown';
  }

  getNextDrillDownSelectedDimension(): SelectedDimension {
    throw new Error('Abstract method');
  }

  getNextMeasureVisualizationType(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    measureVisualizationType?: MeasureVisualizationType,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selectedMeasureIndex?: number
  ): MeasureVisualizationType {
    throw new Error('Abstract method');
  }

  getPreviousDrillDownSelectedDimension(): SelectedDimension {
    throw new Error('Abstract method');
  }

  getPrimarySelectedDimensionType(): DimensionVisualizationType | null {
    throw new Error('Abstract method');
  }

  getRadiusTypeSelectedMeasureForColor(color: string): SelectedMeasure | undefined {
    return this.selectedMeasures.find(
      (selectedMeasure: SelectedMeasure) =>
        selectedMeasure.visualizationType === 'radius' && selectedMeasure.visualizationColor === color
    );
  }

  getSelectedDimensionOfType(visualizationType: DimensionVisualizationType): SelectedDimension | null | undefined {
    return Utils.findElem(this.selectedDimensions, 'visualizationType', visualizationType);
  }

  getSelectedFilters(): SelectedFilter[] {
    return this.selectedFilters.getSelectedFilters();
  }

  getSelectedMeasureOfType(visualizationType: MeasureVisualizationType): SelectedMeasure | null | undefined {
    return Utils.findElem(this.selectedMeasures, 'visualizationType', visualizationType);
  }

  getSelectedMeasuresOfType(visualizationType: MeasureVisualizationType): SelectedMeasure[] {
    return Utils.pick(this.selectedMeasures, 'visualizationType', visualizationType);
  }

  getSelectedSortBys(): SelectedSortBy[] {
    return this.selectedSortBys.getSelectedSortBys();
  }

  getStrokeWidth(): number | number[] {
    return 0;
  }

  getSubtitleText(): string {
    if (this.selectedDimensions.length > 0 && this.selectedMeasures.length > 0) {
      return this.selectedDimensions[0].dimension.name;
    }

    return '';
  }

  getSupportedAggregationFunctions(): AggregationFunction[] {
    return ['SUM', 'AVG', 'MIN', 'MAX', 'STDDEV', 'VAR'];
  }

  getSupportedMeasureVisualizationTypes(
    selectedMeasure: SelectedMeasure,
    supportedMeasureVisualizationTypes?: MeasureVisualizationType[]
  ): MeasureVisualizationType[] {
    if (supportedMeasureVisualizationTypes && selectedMeasure.visualizationType === 'tooltip') {
      return ['tooltip'];
    }

    return [...(supportedMeasureVisualizationTypes || [])];
  }

  getName(): string {
    let name = '';

    if (this.getTitleText()) {
      if (this.getSubtitleText()) {
        name = `${this.id}. ${this.getTitleText()}, ${this.getSubtitleText()}`;
      } else {
        name = `${this.id}. ${this.getTitleText()}`;
      }
    }

    return name;
  }

  getTitleText(): string | null {
    return this.selectedMeasures.reduce((accumulatedTitle: string, { measure: { name } }: SelectedMeasure): string => {
      if (accumulatedTitle === '') {
        return name;
      } else {
        return `${accumulatedTitle}, ${name}`;
      }
    }, '');
  }

  getApexYAxisTitleOptions(): object {
    return {};
  }

  getTooltipXValueFormatter(): ((value: any, params: object) => string) | null | undefined {
    return null;
  }

  getTooltipYValueFormatter(): ((value: any, params: object) => string) | null | undefined {
    return null;
  }

  getValidAggregationFunction(aggregationFunction: AggregationFunction): AggregationFunction {
    return aggregationFunction === 'NONE' ? 'SUM' : aggregationFunction;
  }

  getWidth(layout: Layout, chartAreaWidth: number): number {
    return (
      _.head(
        Utils.pick(layout, 'i', this.id).map(
          (gridItem: GridItem) => (gridItem.w / Constants.GRID_COLUMN_COUNT) * chartAreaWidth
        )
      ) ?? 0
    );
  }

  handleChartJsClick(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    event: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    activeElements: any[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: object,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    stateNamespace: ChartAreaStateNamespace,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    actions: Record<string, (...args: any[]) => void>
  ): void {
    throw new Error('Not implemented');
  }

  abstract handleDataPointSelection(
    event: object,
    chartContext: object,
    params: object,
    stateNamespace: ChartAreaStateNamespace,
    actions: Record<string, (...args: any[]) => void>
  ): void;

  hasContinuousXAxis(): boolean {
    return false;
  }

  hasData(): boolean {
    return this.selectedMeasures.length > 0;
  }

  hasFloatingSubtitle(): boolean {
    return false;
  }

  hasFloatingTitle(): boolean {
    return false;
  }

  hasFollowCursorTooltip(): boolean {
    return false;
  }

  hasIntersectTooltip(): boolean {
    return false;
  }

  hasLargerTitle(): boolean {
    return false;
  }

  hasNonTimestampLegend(): boolean {
    return false;
  }

  hasSelectedDimensionOfType(visualizationType: DimensionVisualizationType): boolean {
    return Utils.has(this.selectedDimensions, 'visualizationType', visualizationType);
  }

  hasSelectedMeasureOfType(visualizationType: MeasureVisualizationType): boolean {
    return Utils.has(this.selectedMeasures, 'visualizationType', visualizationType);
  }

  hasSharedTooltip(): boolean {
    return false;
  }

  hasTimestampLegend(): boolean {
    return false;
  }

  hasTimestampXAxis(): boolean {
    return false;
  }

  isPieOrDonutWithMultipleMeasuresOnly(): boolean {
    return false;
  }

  isTimelineChart(): boolean {
    return false;
  }

  isXAxisScrollable(): boolean {
    return false;
  }

  isZoomable(): boolean {
    return this.hasTimestampXAxis();
  }

  mergeChartData(columnNameToValuesMap: ColumnNameToValuesMap) {
    this.chartData = new ChartDataImpl(Object.assign(this.chartData.getColumnNameToValuesMap(), columnNameToValuesMap));
  }

  removeSelectedDimension(selectedDimension: SelectedDimension) {
    this.selectedDimensions = _.without(this.selectedDimensions, selectedDimension);
  }

  removeSelectedMeasure(selectedMeasure: SelectedMeasure) {
    this.selectedMeasures = _.without(this.selectedMeasures, selectedMeasure);
    const tooltipSelectedMeasures = this.getSelectedMeasuresOfType('tooltip');

    if (tooltipSelectedMeasures.length === this.selectedMeasures.length) {
      this.selectedMeasures = [];
    }
  }

  selectDataPoint(dataPoint: DataPoint) {
    this.selectedDataPoints.push(dataPoint);
  }

  setChartData(columnNameToValuesMap: ColumnNameToValuesMap) {
    this.isFetchingChartData = false;
    this.chartData = new ChartDataImpl(columnNameToValuesMap);
    this.chartData.filterChartData(this.getSelectedFilters());
    this.chartData.sortChartData(this.getSelectedSortBys());
  }

  setIsFetchingChartData(isFetchingCharData: boolean) {
    this.isFetchingChartData = isFetchingCharData;
  }

  shouldShowAsSparkline(): boolean {
    return false;
  }

  shouldShowDataLabels(): boolean {
    throw new Error('Abstract method');
  }

  shouldShowDataLabelsDropShadow(): boolean {
    return false;
  }

  shouldShowGrid(): boolean {
    return this.selectedMeasures.length > 0;
  }

  shouldShowLegend(): [boolean, LegendPosition] {
    return [false, 'bottom'];
  }

  shouldShowStroke(): boolean {
    return false;
  }

  shouldShowYAxisTooltip(): boolean {
    return false;
  }

  abstract sliceOrFillXAxisData(data: Array<any>): Array<any>;

  supportsAllDimension(): boolean {
    return false;
  }

  supportsDataPointsCount(): boolean {
    return false;
  }

  supportsLegend(): boolean {
    throw new Error('Abstract method');
  }

  supportsSelectedDimensionVisualizationColor(): boolean {
    return false;
  }

  supportsSelectedMeasureVisualizationColor(): boolean {
    return false;
  }

  supportsTooltipSelectedDimension(): boolean {
    throw new Error('Abstract method');
  }

  getColumns(): Column[] {
    const measureColumns: Column[] = this.selectedMeasures.map(
      ({ sqlColumn: { name, expression } }: SelectedMeasure) => ({
        name,
        expression,
        type: 'measure'
      })
    );

    const dimensionColumns: Column[] = this.selectedDimensions.map(
      ({ sqlColumn: { name, expression } }: SelectedDimension) => ({
        name,
        expression,
        type: 'dimension'
      })
    );

    const selectedFilters = this.getSelectedFilters();

    const filterDimensionColumns: Column[] = selectedFilters
      .filter(
        ({ dataScopeType, measureOrDimension, type }: SelectedFilter) =>
          type === 'dimension' &&
          dataScopeType === 'already fetched' &&
          dimensionColumns.filter(({ name }: Column) => name === measureOrDimension.name).length === 0
      )
      .map(({ sqlColumn: { name, expression } }: SelectedFilter) => ({
        name,
        expression,
        type: 'dimension'
      }));

    const filterMeasureColumns: Column[] = selectedFilters
      .filter(
        ({ dataScopeType, measureOrDimension, type }: SelectedFilter) =>
          type === 'measure' &&
          dataScopeType === 'already fetched' &&
          measureColumns.filter(({ name }: Column) => name === measureOrDimension.name).length === 0
      )
      .map(({ sqlColumn: { name, expression } }: SelectedFilter) => ({
        name,
        expression,
        type: 'measure'
      }));

    const selectedSortBys = this.getSelectedSortBys();

    const sortByDimensionColumns: Column[] = selectedSortBys
      .filter(
        ({ dataScopeType, measureOrDimension, type }: SelectedSortBy) =>
          type === 'dimension' &&
          dataScopeType === 'already fetched' &&
          dimensionColumns.filter(({ name }: Column) => name === measureOrDimension.name).length === 0
      )
      .map(({ sqlColumn: { name, expression } }: SelectedSortBy) => ({
        name,
        expression,
        type: 'dimension'
      }));

    const sortByMeasureColumns: Column[] = selectedSortBys
      .filter(
        ({ dataScopeType, measureOrDimension, type }: SelectedSortBy) =>
          type === 'measure' &&
          dataScopeType === 'already fetched' &&
          measureColumns.filter(({ name }: Column) => name === measureOrDimension.name).length === 0
      )
      .map(({ sqlColumn: { name, expression } }: SelectedSortBy) => ({
        name,
        expression,
        type: 'measure'
      }));

    return [
      ...measureColumns,
      ...dimensionColumns,
      ...filterMeasureColumns,
      ...filterDimensionColumns,
      ...sortByMeasureColumns,
      ...sortByDimensionColumns
    ];
  }
}
