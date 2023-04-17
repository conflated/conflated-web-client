/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import type { SelectedDimension } from '../selecteddimension/SelectedDimension';
import type { SelectedMeasure } from '../selectedmeasure/SelectedMeasure';
import type { Chart } from '../Chart';
import type { ChartType } from '../types/ChartType';
import type { DataSource } from '../datasource/DataSource';
import type { DimensionVisualizationType } from '../selecteddimension/DimensionVisualizationType';
import type { MeasureVisualizationType } from '../selectedmeasure/types/MeasureVisualizationType';
import type { ChartMenuConfirmationType } from '../types/ChartMenuConfirmationType';
import type { ChartConfiguration } from '../ChartConfiguration';
import type { DataPoint } from '../types/DataPoint';
import type { DrillDown } from '../types/DrillDown';
import ChartFiltersImpl from '../filters/ChartFiltersImpl';
import ChartSortsImpl from '../sorts/impl/ChartSortsImpl';
import type { ChartSorts } from '../sorts/ChartSorts';
import type { ChartFilters } from '../filters/ChartFilters';
import type { FillType } from '../types/FillType';
import ChartFactory from '../ChartFactory';
import type { AggregationFunction } from '../selectedmeasure/types/AggregationFunction';
import ChartDataImpl from '../data/ChartDataImpl';
import type { ChartData } from '../data/ChartData';
import type { Dimension } from '../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import SelectedDimensionFactory from '../selecteddimension/SelectedDimensionFactory';
import type { Theme } from '../../../../../../../page/dataexplorer/model/state/types/Theme';
import SelectedMeasureFactory from '../selectedmeasure/SelectedMeasureFactory';
import Utils from '../../../../../../utils/Utils';
import SqlUtils from '../../../../../../utils/SqlUtils';
import type { DataSeries } from '../types/DataSeries';
import type { Filter } from '../filters/filter/Filter';
import type { ColumnNameToValuesMap } from '../data/ColumnNameToValuesMap';
import emptyDataSource from '../datasource/emptyDataSource';
import type { Sort } from '../sorts/sort/Sort';
import type { LegendPosition } from '../types/LegendPosition';
import Constants from '../../../../../../Constants';
import type { GridItem } from '../../../../model/state/types/GridItem';
import type { GridItems } from '../../../../model/state/types/GridItems';
import type { Column } from '../types/Column';
import DimensionDropZoneListItemViewFactory from '../../../../../../../page/dataexplorer/pane/left/selector/dimension/view/dimensiondropzonelistitemviewfactory/DimensionDropZoneListItemViewFactory';
import { ChartAreaStateNamespace } from '../../../../model/state/types/ChartAreaStateNamespace';

export default abstract class AbstractChart implements Chart {
  id = '1';

  type: ChartType = 'column';

  dataSource: DataSource = emptyDataSource;

  selectedMeasures: SelectedMeasure[] = [];

  selectedDimensions: SelectedDimension[] = [];

  filters: ChartFilters = new ChartFiltersImpl([], new ChartDataImpl());

  sorts: ChartSorts = new ChartSortsImpl([]);

  data: ChartData = new ChartDataImpl();

  xAxisCategoriesShownCount = 10;

  fetchedRowCount = 1000;

  xAxisScrollPosition?: number = 0;

  isFetchingData?: boolean = false;

  selectedDataPointIndex?: number = undefined;

  selectedDataPoints: DataPoint[] = [];

  currentDrillDownSelectedDimension?: SelectedDimension = undefined;

  drillDowns?: DrillDown[] = [];

  isExportMenuOpen?: boolean = false;

  exportMenuCloseTimeoutID?: ReturnType<typeof setTimeout> | 0 = undefined;

  menuConfirmationType?: ChartMenuConfirmationType = undefined;

  map: any;

  constructor(chartConfiguration?: ChartConfiguration) {
    if (chartConfiguration) {
      this.id = chartConfiguration.id;
      this.type = chartConfiguration.type;
      this.dataSource = chartConfiguration.dataSource;
      this.selectedMeasures = chartConfiguration.selectedMeasures;
      this.selectedDimensions = chartConfiguration.selectedDimensions;
      this.data = new ChartDataImpl(chartConfiguration.data);
      this.filters = new ChartFiltersImpl(chartConfiguration.filters, this.data);
      this.sorts = new ChartSortsImpl(chartConfiguration.sorts);
      this.xAxisCategoriesShownCount = chartConfiguration.xAxisCategoriesShownCount;
      this.fetchedRowCount = chartConfiguration.fetchedRowCount;
      this.xAxisScrollPosition = chartConfiguration.xAxisScrollPosition;
      this.isFetchingData = chartConfiguration.isFetchingChartData;
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

    this.sorts.updateSortsWhenChangingSelectedMeasureAggregationFunction(aggregationFunction, this.selectedMeasures);
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

  abstract createView(
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
  getApexDataSeries(shownXAxisCategories: Array<any>): DataSeries[] | any[] {
    throw new Error('Abstract method called');
  }

  getApexType(): string {
    return this.type === 'column' ? 'bar' : this.type;
  }

  getApexXAxisOptions(): object {
    return {};
  }

  getConfigHintSubtitle(): string {
    if (
      this.dataSource !== emptyDataSource &&
      this.selectedMeasures.length === 0 &&
      this.selectedDimensions.length === 0
    ) {
      return 'To add, click a measure or dimension name';
    }

    return '';
  }

  getConfigHintTitle(): string {
    if (this.dataSource === emptyDataSource) {
      return 'Select a data source';
    } else if (this.selectedMeasures.length === 0 && this.selectedDimensions.length === 0) {
      return 'Add a measure or dimension';
    } else if (this.selectedMeasures.length === 0) {
      return 'Add a measure';
    } else if (this.selectedDimensions.length === 0) {
      return 'Add a dimension';
    }

    return '';
  }

  getConfiguration(): ChartConfiguration {
    return {
      id: this.id,
      type: this.type,
      dataSource: this.dataSource,
      selectedMeasures: this.selectedMeasures,
      selectedDimensions: this.selectedDimensions,
      filters: this.getFilters(),
      sorts: this.getSorts(),
      data: this.data.getColumnNameToValuesMap(),
      xAxisCategoriesShownCount: this.xAxisCategoriesShownCount,
      fetchedRowCount: this.fetchedRowCount,
      xAxisScrollPosition: this.xAxisScrollPosition,
      isFetchingChartData: this.isFetchingData,
      selectedDataPointIndex: this.selectedDataPointIndex,
      drillDowns: this.drillDowns,
      selectedDataPoints: this.selectedDataPoints,
      isExportMenuOpen: this.isExportMenuOpen,
      exportMenuCloseTimeoutID: this.exportMenuCloseTimeoutID,
      menuConfirmationType: this.menuConfirmationType
    };
  }

  getDataForSelectedDimensionOfType(dimensionVisualizationType: DimensionVisualizationType): Array<any> {
    return this.data.getForSelectedDimensionOfType(this.selectedDimensions, dimensionVisualizationType);
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

  getHeight(layout: GridItems, chartAreaHeight: number): number {
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
      ...this.getConfiguration(),
      type: newChartType
    });

    if (this.selectedDimensions.length === selectedDimensionsWithPreviousType.length) {
      newChart.selectedDimensions = selectedDimensionsWithPreviousType;
    } else {
      newChart.selectedDimensions = newChart.getConvertedSelectedDimensions();
    }

    newChart.selectedMeasures = newChart.getConvertSelectedMeasures();

    newChart.sorts = new ChartSortsImpl(newChart.sorts.getConvertedSorts(this.selectedDimensions));

    if (newChart.sorts !== this.sorts) {
      this.data.sortChartData(newChart.getSorts(), 'all');
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

  getFilters(): Filter[] {
    return this.filters.getFilters();
  }

  getSelectedMeasureOfType(visualizationType: MeasureVisualizationType): SelectedMeasure | null | undefined {
    return Utils.findElem(this.selectedMeasures, 'visualizationType', visualizationType);
  }

  getSelectedMeasuresOfType(visualizationType: MeasureVisualizationType): SelectedMeasure[] {
    return Utils.pick(this.selectedMeasures, 'visualizationType', visualizationType);
  }

  getSorts(): Sort[] {
    return this.sorts.getSorts();
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

  getTitleText(): string {
    const title = this.selectedMeasures.reduce(
      (accumulatedTitle: string, { measure: { name } }: SelectedMeasure): string => {
        if (accumulatedTitle === '') {
          return name;
        } else {
          return `${accumulatedTitle}, ${name}`;
        }
      },
      ''
    );

    return title;
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

  getWidth(layout: GridItems, chartAreaWidth: number): number {
    return (
      _.head(
        Utils.pick(layout, 'i', this.id).map(
          (gridItem: GridItem) => (gridItem.w / Constants.GRID_COLUMN_COUNT) * chartAreaWidth
        )
      ) ?? 0
    );
  }

  abstract handleDataPointSelectionOrDrilldown(
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

  mergeData(columnNameToValuesMap: ColumnNameToValuesMap) {
    this.data = new ChartDataImpl(Object.assign(this.data.getColumnNameToValuesMap(), columnNameToValuesMap));
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

  setData(columnNameToValuesMap: ColumnNameToValuesMap) {
    this.isFetchingData = false;
    this.data = new ChartDataImpl(columnNameToValuesMap);
    this.data.filterChartData(this.getFilters());
    this.data.sortChartData(this.getSorts());
  }

  setIsFetchingData(isFetchingCharData: boolean) {
    this.isFetchingData = isFetchingCharData;
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

  setMap(map: any) {
    this.map = map;
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

    const selectedFilters = this.getFilters();

    const filterDimensionColumns: Column[] = selectedFilters
      .filter(
        ({ dataScopeType, measureOrDimension, type }: Filter) =>
          type === 'dimension' &&
          dataScopeType === 'already fetched' &&
          dimensionColumns.filter(({ name }: Column) => name === measureOrDimension.name).length === 0
      )
      .map(({ sqlColumn: { name, expression } }: Filter) => ({
        name,
        expression,
        type: 'dimension'
      }));

    const filterMeasureColumns: Column[] = selectedFilters
      .filter(
        ({ dataScopeType, measureOrDimension, type }: Filter) =>
          type === 'measure' &&
          dataScopeType === 'already fetched' &&
          measureColumns.filter(({ name }: Column) => name === measureOrDimension.name).length === 0
      )
      .map(({ sqlColumn: { name, expression } }: Filter) => ({
        name,
        expression,
        type: 'measure'
      }));

    const selectedSortBys = this.getSorts();

    const sortByDimensionColumns: Column[] = selectedSortBys
      .filter(
        ({ dataScope, measureOrDimension, type }: Sort) =>
          type === 'dimension' &&
          dataScope === 'already fetched' &&
          dimensionColumns.filter(({ name }: Column) => name === measureOrDimension.name).length === 0
      )
      .map(({ sqlColumn: { name, expression } }: Sort) => ({
        name,
        expression,
        type: 'dimension'
      }));

    const sortByMeasureColumns: Column[] = selectedSortBys
      .filter(
        ({ dataScope, measureOrDimension, type }: Sort) =>
          type === 'measure' &&
          dataScope === 'already fetched' &&
          measureColumns.filter(({ name }: Column) => name === measureOrDimension.name).length === 0
      )
      .map(({ sqlColumn: { name, expression } }: Sort) => ({
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
