/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChartAreaPageStateNamespace } from '../../../model/state/types/ChartAreaPageStateNamespace';
import type { DimensionVisualizationType } from './selecteddimension/types/DimensionVisualizationType';
import type { SelectedMeasure } from './selectedmeasure/SelectedMeasure';
import type { MeasureVisualizationType } from './selectedmeasure/types/MeasureVisualizationType';
import type { FillType } from './types/FillType';
import type { AggregationFunction } from './selectedmeasure/types/AggregationFunction';
import type { ChartType } from './types/ChartType';
import type { ChartConfiguration } from './ChartConfiguration';
import type { DataSource } from '../../../../../model/state/datasource/DataSource';
import type { SelectedFilters } from './selectedfilters/SelectedFilters';
import type { SelectedSortBys } from './selectedsortbys/SelectedSortBys';
import type { DrillDown } from './types/DrillDown';
import type { DataPoint } from './types/DataPoint';
import type { ChartMenuConfirmationType } from './types/ChartMenuConfirmationType';
import type { ChartData } from './chartdata/ChartData';
import type { Measure } from '../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/entities/Measure';
import type { Dimension } from '../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/entities/Dimension';
import type { Theme } from '../../../../../../pages/dataexplorer/settings/state/entities/Theme';
import type { SelectedDimension } from './selecteddimension/SelectedDimension';
import type { DataSeries } from './types/DataSeries';
import DimensionDropZoneListItemViewFactory from '../../../../../../pages/dataexplorer/leftpane/dimensionselector/view/dimensiondropzonelistitemviewfactory/DimensionDropZoneListItemViewFactory';
import type { LegendPosition } from './types/LegendPosition';
import type { SelectedFilter } from './selectedfilters/selectedfilter/SelectedFilter';
import type { ColumnNameToValuesMap } from './chartdata/ColumnNameToValuesMap';
import type { SelectedSortBy } from './selectedsortbys/selectedsortby/SelectedSortBy';
import type { Layout } from '../../../model/state/types/Layout';
import type { Column } from './types/Column';

export interface Chart {
  id: string;
  chartType: ChartType;
  dataSource: DataSource;
  selectedMeasures: SelectedMeasure[];
  selectedDimensions: SelectedDimension[];
  selectedFilters: SelectedFilters;
  selectedSortBys: SelectedSortBys;
  chartData: ChartData;
  xAxisCategoriesShownCount: number;
  fetchedRowCount: number;
  xAxisScrollPosition?: number;
  isFetchingChartData?: boolean;
  selectedDataPointIndex?: number;
  drillDowns?: DrillDown[];
  selectedDataPoints: DataPoint[];
  isExportMenuOpen?: boolean;
  exportMenuCloseTimeoutID?: ReturnType<typeof setTimeout> | 0;
  menuConfirmationType?: ChartMenuConfirmationType;

  addSelectedMeasure(measureOrDimension: Measure | Dimension, aggregationFunction: AggregationFunction): void;

  addSelectedDimension(dimension: Dimension | Measure, visualizationType: DimensionVisualizationType): void;

  changeSelectedDimensionColor(selectedDimension: SelectedDimension, color: string): void;

  changeSelectedMeasureColor(selectedMeasure: SelectedMeasure, color: string): void;

  changeSelectedMeasureTypeAndColor(
    selectedMeasure: SelectedMeasure,
    visualizationType: MeasureVisualizationType,
    color: string
  ): void;

  changeSelectedMeasureAggregationFunction(
    selectedMeasure: SelectedMeasure,
    aggregationFunction: AggregationFunction
  ): void;

  createChartView(width: number, height: number, stateNamespace: ChartAreaPageStateNamespace): JSX.Element;

  getConvertedSelectedDimensions(): SelectedDimension[];

  getConvertSelectedMeasures(): SelectedMeasure[];

  getMaxScrollPosition(): number;

  deselectDataPoint(dataPoint: DataPoint): void;

  drillDown(drillDown: DrillDown, newDrillDownSelectedDimension: SelectedDimension): void;

  drillUp(): boolean;

  getHeight(layout: Layout, chartAreaHeight: number): number;

  getWidth(layout: Layout, chartAreaWidth: number): number;

  exportToPng(): void;

  exportToPdf(): void;

  exportToSvg(): void;

  getAllColors(theme: Theme): string[];

  getApexChartDataSeries(shownXAxisCategories: Array<any>): DataSeries[] | any[];

  getApexChartType(): string;

  getApexXAxisOptions(): object;

  getChartConfigHintSubtitle(): string;

  getChartConfigHintTitle(): string;

  getChartJsDataSetsAndLabels(): object;

  getColors(): string[];

  getDimensionDropZoneListItemViews(
    dimensionDropZoneListItemViewFactory: DimensionDropZoneListItemViewFactory
  ): Array<JSX.Element>;

  getLabels(): any[] | null | undefined;

  getMeasureVisualizationColorFor(
    selectedMeasure: SelectedMeasure,
    measureVisualizationType: MeasureVisualizationType
  ): string;

  getNextDimensionVisualizationType(): DimensionVisualizationType;

  getNextDrillDownSelectedDimension(): SelectedDimension;

  getNextMeasureVisualizationType(
    measureVisualizationType?: MeasureVisualizationType,
    selectedMeasureIndex?: number
  ): MeasureVisualizationType;

  getPreviousDrillDownSelectedDimension(): SelectedDimension;

  getRadiusTypeSelectedMeasureForColor(color: string): SelectedMeasure | null | undefined;

  getSelectedDimensionOfType(visualizationType: DimensionVisualizationType): SelectedDimension | null | undefined;

  getStrokeWidth(): number | number[];

  getSubtitleText(): string;

  getTitleText(): string | null;

  getValidAggregationFunction(aggregationFunction: AggregationFunction): AggregationFunction;

  getChartConfiguration(): ChartConfiguration;

  getChartDataForSelectedDimensionOfType(dimensionVisualizationType: DimensionVisualizationType): Array<any>;

  getFillOpacity(): number;

  getFillType(): FillType;

  getGradientFillType(): FillType | FillType[];

  getLegendType(): string;

  getNewChartOfType(newChartType: ChartType): Chart;

  getPrimarySelectedDimensionType(): DimensionVisualizationType | null;

  getSelectedFilters(): SelectedFilter[];

  getSelectedSortBys(): SelectedSortBy[];

  getSupportedAggregationFunctions(): AggregationFunction[];

  getSupportedMeasureVisualizationTypes(
    selectedMeasure: SelectedMeasure,
    supportedMeasureVisualizationTypes?: MeasureVisualizationType[]
  ): MeasureVisualizationType[];

  getTooltipXValueFormatter(): ((value: any, params: object) => string) | null | undefined;

  getTooltipYValueFormatter(): ((value: any, params: object) => string) | null | undefined;

  getColumns(): Column[];

  handleDataPointSelection(
    event: object,
    chartContext: object,
    params: object,
    stateNamespace: ChartAreaPageStateNamespace,
    actions: Record<string, (...args: any[]) => void>
  ): void;

  handleChartJsClick(
    event: any,
    activeElements: object[],
    data: object,
    stateNamespace: ChartAreaPageStateNamespace,
    actions: Record<string, (...args: any[]) => any>
  ): void;

  hasData(): boolean;

  isPieOrDonutWithMultipleMeasuresOnly(): boolean;

  hasFloatingSubtitle(): boolean;

  hasFloatingTitle(): boolean;

  hasIntersectTooltip(): boolean;

  hasFollowCursorTooltip(): boolean;

  hasLargerTitle(): boolean;

  hasNonTimestampLegend(): boolean;

  hasSelectedDimensionOfType(visualizationType: DimensionVisualizationType): boolean;

  hasSelectedMeasureOfType(visualizationType: MeasureVisualizationType): boolean;

  hasSharedTooltip(): boolean;

  hasTimestampLegend(): boolean;

  hasTimestampXAxis(): boolean;

  hasContinuousXAxis(): boolean;

  isXAxisScrollable(): boolean;

  isZoomable(): boolean;

  isTimelineChart(): boolean;

  mergeChartData(columnNameToValuesMap: ColumnNameToValuesMap): void;

  removeSelectedDimension(selectedDimension: SelectedDimension): void;

  removeSelectedMeasure(selectedMeasure: SelectedMeasure): void;

  selectDataPoint(dataPoint: DataPoint): void;

  setChartData(columnNameToValuesMap: ColumnNameToValuesMap): void;

  setIsFetchingChartData(isFetchingCharData: boolean): void;

  shouldShowAsSparkline(): boolean;

  shouldShowDataLabelsDropShadow(): boolean;

  shouldShowGrid(): boolean;

  shouldShowStroke(): boolean;

  shouldShowYAxisTooltip(): boolean;

  shouldShowDataLabels(): boolean;

  shouldShowLegend(): [boolean, LegendPosition];

  sliceOrFillXAxisData(data: Array<any>): Array<any>;

  supportsDataPointsCount(): boolean;

  supportsLegend(): boolean;

  supportsTooltipSelectedDimension(): boolean;

  supportsAllDimension(): boolean;

  supportsSelectedDimensionVisualizationColor(): boolean;

  supportsSelectedMeasureVisualizationColor(): boolean;
}
